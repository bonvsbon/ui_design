import { chromium, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import fs from 'node:fs/promises'
const base = process.env.TEST_URL || 'http://localhost:3100'
const browser = await chromium.launch({
  channel: process.env.PLAYWRIGHT_CHANNEL || 'chrome',
  headless: true,
})
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: 'reduce',
})
const page = await context.newPage()
const errors = [],
  checks = [],
  accessibility = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push(page.url() + ': ' + m.text())
  if (m.type() === 'warning' && m.text().includes('Hydration'))
    console.log('HYDRATION', page.url(), m.text().slice(0, 1600))
})
await fs.mkdir('docs/qa', { recursive: true })
async function go(route) {
  const response = await page.goto(base + route, { waitUntil: 'networkidle' })
  expect(response.status(), route).toBe(200)
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
async function audit(label) {
  const a = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  accessibility.push({
    label,
    violations: a.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      description: v.description,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
    })),
  })
  console.log('AXE', label, a.violations.length)
}
try {
  for (const width of process.env.FLOWS_ONLY ? [] : [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 })
    for (const route of [
      '/',
      '/products',
      '/product/demo',
      '/technology',
      '/stories',
      '/stores',
      '/stories/weekend-style-guide',
      '/about',
      '/support',
      '/studio',
    ]) {
      await go(route)
      expect(await page.locator('main h1').count(), route + ' H1').toBe(1)
      const metrics = await page.evaluate(() => ({
        width: innerWidth,
        scroll: document.documentElement.scrollWidth,
        broken: [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src),
      }))
      checks.push({ route, width, ...metrics })
      console.log('LAYOUT', route, width, JSON.stringify(metrics))
      expect(metrics.broken, 'broken images ' + route).toEqual([])
      expect(metrics.scroll, 'overflow ' + route + ' ' + width).toBeLessThanOrEqual(width)
      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')
      await page.screenshot({ path: `docs/qa/${name}-${width}.png`, fullPage: true })
      if (['/', '/products', '/product/demo', '/technology', '/stores', '/studio'].includes(route))
        await audit(`${route}-${width}`)
    }
  }
  for (const width of process.env.FLOWS_ONLY ? [] : [360, 768, 1024]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const route of ['/', '/products', '/product/demo']) {
      await go(route)
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        'responsive ' + route + ' ' + width
      ).toBeLessThanOrEqual(width)
      checks.push({ responsive: route, width })
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 })
  await go('/')
  await page.getByRole('button', { name: 'Men', exact: true }).click()
  await expect(page.locator('.mega-menu')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('.mega-menu')).toBeHidden()
  checks.push({ flow: 'mega menu and Escape' })
  await page.getByRole('button', { name: 'Search products', exact: true }).click()
  await page
    .getByRole('textbox', { name: 'Search products, collections, categories and stories' })
    .fill('Gambol')
  await expect(page.locator('.search-result')).toHaveCount(6)
  await audit('search-dialog')
  await page
    .getByRole('textbox', { name: 'Search products, collections, categories and stories' })
    .fill('zzzzzz')
  await expect(page.getByText('No pairs found yet.')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('.commerce-dialog')).not.toBeVisible()
  checks.push({ flow: 'search suggestions, empty state and Escape' })
  const first = page.locator('.product-card').first()
  await first.getByRole('button', { name: /Save .* to wishlist/ }).click()
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open wishlist', exact: true }).click()
  await expect(page.locator('.wishlist-grid .product-card')).toHaveCount(1)
  await audit('wishlist-dialog')
  await page.keyboard.press('Escape')
  checks.push({ flow: 'wishlist persistence' })
  await page.locator('.product-card').first().getByRole('button', { name: 'QUICK VIEW' }).click()
  await expect(page.locator('.dialog-quick')).toBeVisible()
  await page
    .locator('.dialog-quick')
    .getByRole('button', { name: 'ADD TO BAG', exact: true })
    .click()
  await expect(page.getByRole('alert')).toContainText('Choose a size')
  await page.locator('.dialog-quick').getByRole('button', { name: 'Size 40', exact: true }).click()
  await page
    .locator('.dialog-quick')
    .getByRole('button', { name: 'ADD TO BAG', exact: true })
    .click()
  await expect(page.locator('.bag-item')).toHaveCount(1)
  await page.getByRole('button', { name: /Increase .* quantity/ }).click()
  await expect(page.locator('.quantity-control>span')).toHaveText('2')
  await audit('bag-dialog')
  await page.getByRole('button', { name: 'REVIEW ORDER PREVIEW' }).click()
  await expect(page.getByText(/No payment has been taken/)).toBeVisible()
  await page.keyboard.press('Escape')
  await page.reload({ waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Open shopping bag/ }).click()
  await expect(page.locator('.quantity-control>span')).toHaveText('2')
  await page.getByRole('button', { name: /Remove .* from bag/ }).click()
  await expect(page.getByText('Your next good day starts here.')).toBeVisible()
  await page.keyboard.press('Escape')
  checks.push({
    flow: 'quick view, size validation, bag quantity, persistence, preview and removal',
  })
  await go('/products?gender=All')
  const all = await page.locator('.catalog-grid .product-card').count()
  await page.getByRole('button', { name: 'Slides', exact: true }).click()
  expect(await page.locator('.catalog-grid .product-card').count()).toBeLessThan(all)
  await page.locator('.sort-label select').selectOption('price-high')
  const prices = await page.locator('.catalog-grid .product-name-price strong').allTextContents()
  expect(prices.map((p) => Number(p.replace(/\D/g, '')))).toEqual(
    prices.map((p) => Number(p.replace(/\D/g, ''))).sort((a, b) => b - a)
  )
  await page.getByRole('button', { name: 'Sandals', exact: true }).click()
  await expect(page.getByText('No pairs in this combination.')).toBeVisible()
  await page.getByRole('button', { name: 'RESET FILTERS', exact: true }).click()
  await expect(page.locator('.catalog-grid .product-card')).toHaveCount(all)
  checks.push({ flow: 'filtering, sorting, empty state and reset' })
  await go('/product/demo')
  await expect(
    page.getByRole('button', { name: 'Size 45, unavailable', exact: true })
  ).toBeDisabled()
  await page.getByRole('button', { name: 'Red', exact: true }).click()
  await expect(page.locator('.pdp-main-image>img')).toHaveAttribute(
    'src',
    '/images/variant-3-1.webp'
  )
  await page.getByRole('button', { name: 'Size 41', exact: true }).click()
  await page.getByRole('button', { name: 'BUY NOW', exact: true }).click()
  await expect(page.locator('.bag-item')).toContainText('Red · EU 41')
  await page.keyboard.press('Escape')
  checks.push({ flow: 'PDP color and size carry through to bag' })
  await go('/technology')
  await page.getByRole('tab', { name: 'SOFT', exact: true }).click()
  await expect(page.getByRole('tabpanel')).toContainText('Soft-touch')
  await page.getByRole('tab', { name: 'SOFT', exact: true }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: 'LITE', exact: true })).toBeFocused()
  await expect(page.getByRole('tabpanel')).toContainText('Lightweight')
  checks.push({ flow: 'technology tabs and keyboard navigation' })
  await go('/stores')
  await page.getByLabel('จังหวัด / Province').selectOption('กรุงเทพมหานคร')
  await page.getByLabel('เขต / District').selectOption('บางนา')
  await page.getByRole('button', { name: 'ค้นหาร้านใกล้คุณ' }).click()
  await expect(page.locator('.store-results-grid article')).toHaveCount(1)
  await expect(page.locator('.store-results-grid')).toContainText('Bang Na')
  checks.push({ flow: 'store province and district search' })
  await go('/studio')
  await page
    .getByRole('textbox', { name: 'Section title', exact: true })
    .fill('GOOD DAYS\nSTART HERE.')
  await page.getByRole('button', { name: 'SAVE PREVIEW' }).click()
  await expect(page.getByRole('status')).toContainText('Saved on this device')
  await go('/')
  await expect(page.locator('h1')).toHaveText('GOOD DAYS\nSTART HERE.')
  await go('/studio')
  await page.getByRole('button', { name: 'RESTORE DEFAULTS' }).click()
  await go('/')
  await expect(page.locator('h1')).toHaveText('EVERYDAY\nFEELS BETTER.')
  checks.push({ flow: 'CMS preview persistence and restore' })
  await page.setViewportSize({ width: 390, height: 844 })
  await go('/products')
  await page.getByRole('button', { name: /^FILTER/ }).click()
  await expect(page.locator('.filter-dialog')).toBeVisible()
  await audit('mobile-filter-dialog')
  await page.locator('.filter-dialog').getByLabel('Women', { exact: true }).check()
  await page.getByRole('button', { name: /SHOW \d+ PAIRS/ }).click()
  await expect(page.locator('.catalog-header h1')).toHaveText('WOMEN’S FOOTWEAR')
  checks.push({ flow: 'mobile filter drawer' })
  await page.getByRole('button', { name: 'Open menu', exact: true }).click()
  await expect(page.locator('.mobile-menu-links')).toBeVisible()
  await audit('mobile-menu-dialog')
  await page.keyboard.press('Escape')
  await go('/technology')
  await page.locator('.tech-accordion summary').filter({ hasText: 'SOFT' }).click()
  await expect(page.locator('.tech-accordion details[open]')).toContainText('Soft-touch')
  checks.push({ flow: 'mobile menu and technology accordion' })
  expect(errors, 'browser errors').toEqual([])
  const violations = accessibility.flatMap((a) =>
    a.violations.map((v) => ({ label: a.label, ...v }))
  )
  expect(violations, 'WCAG A/AA violations').toEqual([])
  console.log('PASS', checks.length, 'checks;', accessibility.length, 'accessibility scans')
} catch (e) {
  await page.screenshot({ path: 'docs/qa/failure.png', fullPage: true })
  console.error(e.message)
  process.exitCode = 1
} finally {
  await fs.writeFile(
    'docs/qa/verification.json',
    JSON.stringify({ base, date: new Date().toISOString(), checks, accessibility, errors }, null, 2)
  )
  await browser.close()
}
