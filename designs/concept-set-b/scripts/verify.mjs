import { chromium, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import fs from 'node:fs/promises'
const base = process.env.TEST_URL || 'http://localhost:3000'
const portable = base.startsWith('file:')
const outputDir = portable ? '.playwright/portable' : '.playwright'
const browser = await chromium.launch({
  headless: true,
  channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const page = await context.newPage()
if (portable) await context.setOffline(true)
const errors = []
const results = []
const accessibility = []
page.on('pageerror', (e) => errors.push(e.message))
if (portable)
  page.on('request', (request) => {
    if (/^https?:/.test(request.url())) errors.push('External request: ' + request.url())
  })
await fs.mkdir(outputDir, { recursive: true })
async function go(path) {
  const r = await page.goto(base + path, { waitUntil: 'networkidle' })
  if (!portable) expect(r.status()).toBe(200)
  else
    await page.waitForFunction((target) => {
      const app = document.getElementById('__nuxt')?.__vue_app__
      return app?.config.globalProperties.$router.currentRoute.value.fullPath === target
    }, path)
  await page.evaluate(async () => {
    await document.fonts.ready
    await Promise.all(
      [...document.images].map((i) => {
        i.loading = 'eager'
        return i.decode().catch(() => {})
      })
    )
  })
}
async function checkLayout(route, width) {
  await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
  await go(route)
  expect(await page.locator('main h1').count(), route + ' should have exactly one h1').toBe(1)
  const layout = await page.evaluate(() => ({
    viewport: innerWidth,
    scroll: document.documentElement.scrollWidth,
    broken: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
  }))
  expect(layout.scroll, route + ' overflow').toBeLessThanOrEqual(width)
  expect(layout.broken, route + ' broken images').toEqual([])
  results.push({ route, width, ...layout })
  await page.screenshot({
    path:
      outputDir +
      '/' +
      route.slice(1).replaceAll('/', '-') +
      '-' +
      (width === 390 ? 'mobile' : 'desktop') +
      '.png',
    fullPage: true,
  })
  const report = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze()
  accessibility.push({
    route,
    width,
    violations: report.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    })),
  })
  console.log('RENDER', route, width, 'violations', report.violations.map((v) => v.id).join(','))
}
try {
  if (!process.argv.includes('--flows-only'))
    for (const width of [1440, 390])
      for (const route of [
        '/concept-01',
        '/concept-02',
        '/concept-03',
        '/concept-04',
        '/concept-05',
        '/concept-01/products',
        '/concept-01/product/demo',
      ])
        await checkLayout(route, width)
  await page.setViewportSize({ width: 1440, height: 1000 })
  await go('/concept-01')
  await page.getByRole('button', { name: 'Search products', exact: true }).click()
  await page
    .getByRole('textbox', { name: 'Search products, categories, collections and articles' })
    .fill('slide')
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Cloud Slide' })).toBeVisible()
  await expect(
    page.getByRole('dialog').getByText('The everyday slide guide', { exact: true })
  ).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()
  await page.keyboard.press('Meta+k')
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  await go('/concept-01/products')
  await page.getByRole('button', { name: 'Kids', exact: true }).click()
  await expect(page.locator('.product-card')).toHaveCount(1)
  await page.getByRole('button', { name: 'Clear all filters' }).click()
  await expect(page.locator('.product-card')).toHaveCount(9)
  await page.getByRole('combobox', { name: 'Sort products' }).selectOption('Price: low to high')
  await expect(page.locator('.product-card').first().getByRole('heading')).toHaveText(
    'Little Wanderer'
  )
  await page.getByRole('searchbox', { name: 'Search this collection' }).fill('not-a-real-shoe')
  await expect(page.getByText('Let’s try a different fit.')).toBeVisible()
  await page.getByRole('button', { name: 'Reset filters' }).click()
  await expect(page.locator('.product-card')).toHaveCount(9)
  await go('/concept-01/product/demo')
  await page.getByRole('button', { name: 'ADD TO CART', exact: true }).click()
  await expect(page.getByRole('alert')).toContainText('Choose your size')
  await page.getByRole('button', { name: 'Select Black', exact: true }).click()
  await page.getByRole('button', { name: 'Size EU 40', exact: true }).click()
  await page.getByRole('button', { name: 'ADD TO CART', exact: true }).click()
  await expect(page.getByRole('dialog')).toContainText('Black · EU 40')
  await page.getByRole('button', { name: 'Increase quantity of Cloud Slide' }).click()
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toHaveText(
    'Your bag (2)'
  )
  await expect(page.getByRole('dialog')).toContainText('฿780')
  await expect(page.getByRole('dialog')).toContainText('Your order qualifies for free delivery.')
  await page.keyboard.press('Escape')
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Shopping bag, 2 items', exact: true }).click()
  await expect(page.getByRole('dialog').getByRole('heading', { level: 2 })).toHaveText(
    'Your bag (2)'
  )
  await page.getByRole('button', { name: 'Continue to checkout' }).click()
  await page.getByRole('textbox', { name: 'Name', exact: true }).fill('Demo Shopper')
  await page.getByRole('textbox', { name: 'Email', exact: true }).fill('demo@example.com')
  await page
    .getByRole('textbox', { name: 'Delivery address' })
    .fill('Sample address, Bangkok 10100')
  await page.getByRole('button', { name: 'Place demo order' }).click()
  await expect(page.getByRole('dialog')).toContainText('No payment was taken')
  await page.keyboard.press('Escape')
  await page.getByRole('button', { name: 'Add to wishlist', exact: true }).click()
  await page.getByRole('button', { name: 'Your wishlist', exact: true }).click()
  await expect(page.getByRole('dialog').getByRole('heading', { name: 'Cloud Slide' })).toBeVisible()
  await page.keyboard.press('Escape')
  await go('/concept-04')
  const finder = page.getByRole('region', { name: 'Find your pair' })
  await finder.getByRole('button', { name: 'Kids', exact: true }).click()
  await finder.getByRole('button', { name: 'Outdoor', exact: true }).click()
  await finder.getByRole('button', { name: 'Durable', exact: true }).click()
  await expect(finder).toContainText('Your kind of comfort.')
  await expect(finder.locator('.product-card')).toHaveCount(1)
  await expect(finder).toContainText('Little Wanderer')
  await finder.getByRole('button', { name: 'Start again' }).click()
  await expect(finder).toContainText('Who are you shopping for?')
  await go('/concept-05')
  await page.getByRole('tab', { name: '02 Light core' }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Move a little lighter.')
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tabpanel')).toContainText('Confidence underfoot.')
  await go('/studio')
  await page.getByRole('textbox', { name: 'Campaign headline' }).fill('TEST YOUR\nOWN WAY.')
  await page.getByRole('checkbox', { name: 'Show Shop by category' }).uncheck()
  await page.getByRole('link', { name: 'Preview this concept' }).click()
  await expect(page.locator('h1')).toHaveText('TEST YOUR\nOWN WAY.')
  await expect(page.getByRole('heading', { name: 'Good days start here.' })).toHaveCount(0)
  await go('/studio')
  await page.getByRole('button', { name: 'Reset this concept' }).click()
  await page.getByRole('link', { name: 'Preview this concept' }).click()
  await expect(page.locator('h1')).toHaveText('GO YOUR\nOWN WAY.')
  await go('/overview')
  await expect(page.locator('.concept-preview-card')).toHaveCount(5)
  await page.setViewportSize({ width: 390, height: 844 })
  await go('/concept-01/products')
  await expect(page.locator('#product-filters')).toHaveCount(0)
  await page.getByRole('button', { name: 'Show filters' }).click()
  await expect(page.locator('#product-filters')).toBeVisible()
  await page.getByRole('button', { name: 'Hide filters' }).click()
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('button', { name: 'Search', exact: true })
    .click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await page.keyboard.press('Escape')
  for (const route of [
    '/concept-02/products',
    '/concept-03/products',
    '/concept-04/products',
    '/concept-05/products',
    '/concept-02/product/demo',
    '/concept-03/product/demo',
    '/concept-04/product/demo',
    '/concept-05/product/demo',
  ]) {
    await go(route)
    expect(await page.locator('main h1').count()).toBe(1)
  }
  expect(errors).toEqual([])
  expect(accessibility.flatMap((report) => report.violations)).toEqual([])
  console.log(
    'PASS: all shopping, finder, content editing, persistence, mobile navigation, and route checks.'
  )
} catch (error) {
  console.error('TEST FAILURE', error)
  await page.screenshot({ path: outputDir + '/failure.png', fullPage: true })
  process.exitCode = 1
} finally {
  await fs.writeFile(
    process.argv.includes('--flows-only')
      ? outputDir + '/flows-report.json'
      : outputDir + '/report.json',
    JSON.stringify({ results, accessibility, errors }, null, 2)
  )
  await browser.close()
}
