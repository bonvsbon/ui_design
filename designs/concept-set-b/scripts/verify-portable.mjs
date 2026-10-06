import { chromium, expect } from '@playwright/test'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { execFileSync } from 'node:child_process'

// Test the delivered ZIP after extraction to a different path, without a server.
const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'GAMBOL portable '))
execFileSync('unzip', ['-q', path.resolve('portable/GAMBOL-Portable-All-5.zip'), '-d', temp])
const folder = path.join(temp, 'GAMBOL-Portable')
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome' })
const context = await browser.newContext({ offline: true, reducedMotion: 'reduce' })
const page = await context.newPage()
const errors = [],
  external = [],
  results = []
page.on('pageerror', (error) => errors.push(error.message))
page.on('request', (request) => {
  if (/^https?:/.test(request.url())) external.push(request.url())
})
try {
  for (const name of (await fs.readdir(folder)).filter((name) => name.endsWith('.html'))) {
    const expected = name.startsWith('Concept-')
      ? '/' + name.slice(0, 10).toLowerCase()
      : '/overview'
    await page.goto(pathToFileURL(path.join(folder, name)).href)
    await expect(page.locator('main h1')).toBeVisible()
    expect(new URL(page.url()).hash).toBe('#' + expected)
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all(
        [...document.images].map((image) => {
          image.loading = 'eager'
          return image.decode().catch(() => {})
        })
      )
      for (const family of ['Manrope', 'Noto Sans Thai', 'Barlow Condensed', 'Bodoni Moda']) {
        await document.fonts.load(`500 16px "${family}"`)
      }
    })
    const info = await page.evaluate(() => ({
      broken: [...document.images].filter((image) => !image.naturalWidth).map((image) => image.alt),
      fonts: ['Manrope', 'Noto Sans Thai', 'Barlow Condensed', 'Bodoni Moda'].map((family) => ({
        family,
        loaded: document.fonts.check(`500 16px "${family}"`),
      })),
      overflow: document.documentElement.scrollWidth > innerWidth,
    }))
    expect(info.broken, name).toEqual([])
    expect(
      info.fonts.every((font) => font.loaded),
      name
    ).toBe(true)
    expect(info.overflow, name).toBe(false)
    results.push({ file: name, route: expected, ...info })
    console.log('OFFLINE FILE PASS', name)
  }

  // One HTML moved on its own must retain every route and embedded resource.
  const single = path.join(temp, 'พรีวิว GAMBOL.html')
  await fs.copyFile(path.join(folder, 'Concept-05-Future-Footwear.html'), single)
  const url = pathToFileURL(single).href
  await page.goto(url)
  await page.locator('.future-hero .button-accent').click()
  await expect(page.locator('#technology')).toBeInViewport()
  expect(new URL(page.url()).hash).toBe('#/concept-05#technology')
  await page.locator('.skip-link').focus()
  await page.locator('.skip-link').click()
  expect(new URL(page.url()).hash).toBe('#/concept-05#main')
  await expect(page.locator('main h1')).toHaveCount(1)

  await page.goto(url + '#/concept-03/products?category=Kids')
  await expect(page.locator('main h1')).toHaveText('Kids')
  await expect(page.locator('.product-card')).toHaveCount(1)
  await page.reload()
  await expect(page.locator('main h1')).toHaveText('Kids')
  await expect(page.locator('.product-card')).toHaveCount(1)
  await page.locator('.product-card h3 a').click()
  await expect(page.locator('main h1')).toHaveText('Little Wanderer')
  await page.goBack()
  await expect(page.locator('main h1')).toHaveText('Kids')
  expect(errors).toEqual([])
  expect(external).toEqual([])
  console.log(
    'PASS: ZIP extraction, six standalone files, embedded fonts/images, isolated Unicode file path, anchor navigation, query refresh, and browser history; zero network requests.'
  )
} finally {
  await fs.mkdir('.playwright/portable', { recursive: true })
  await fs.writeFile(
    '.playwright/portable/package-report.json',
    JSON.stringify({ results, errors, external }, null, 2)
  )
  await browser.close()
  await fs.rm(temp, { recursive: true, force: true })
}
