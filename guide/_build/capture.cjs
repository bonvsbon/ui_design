// Captures the screenshots used in the demo guide from the live site.
//   NODE_PATH=designs/concept-set-b/node_modules node guide/_build/capture.cjs
const { chromium } = require('playwright')
const path = require('path')
const BASE = process.env.BASE || 'https://bonvsbon.github.io/ui_design/'
const OUT = path.join(__dirname, 'shots')
const only = process.argv.slice(2)
const fs = require('fs')
const ANN = path.join(OUT, 'annotations.json')
const ann = fs.existsSync(ANN) ? JSON.parse(fs.readFileSync(ANN, 'utf8')) : {}

// Record where numbered markers go: the top-left of each element, in screenshot pixels.
async function mark(p, name, selectors) {
  ann[name] = []
  for (const sel of selectors) {
    const box = await p.locator(sel).first().boundingBox()
    ann[name].push(box ? { x: Math.round(box.x), y: Math.round(box.y), w: Math.round(box.width), h: Math.round(box.height) } : null)
  }
}

const shots = {
  async 'library-top'(b) {
    const p = await open(b, '', { width: 1440, height: 1380 })
    await mark(p, 'library-top', ['.notice', '.feature .badge', '.feature .tags', '.feature .highlights', '.feature .pages', '.feature .btn'])
    await snap(p, 'library-top')
  },
  async 'library-sets'(b) {
    const p = await desk(b, '')
    await p.evaluate(() => document.getElementById('h-set-a').scrollIntoView())
    await p.mouse.wheel(0, -40); await p.waitForTimeout(800)
    await mark(p, 'library-sets', ['#h-set-a', '.grid .card .num', '.grid .card h3', '.grid .card .tags', '.grid .card .btn'])
    await snap(p, 'library-sets')
  },
  async 'library-mobile'(b) { const p = await mob(b, ''); await snap(p, 'library-mobile') },
  async 'search'(b) {
    const p = await desk(b, 'featured/everyday-b/index.html#/')
    await p.getByRole('button', { name: 'Search products' }).first().click(); await p.waitForTimeout(600)
    await p.keyboard.type('slide', { delay: 60 }); await p.waitForTimeout(1200); await snap(p, 'search')
  },
  async 'listing'(b) { const p = await desk(b, 'featured/everyday-b/index.html#/products'); await snap(p, 'listing') },
  async 'product'(b) {
    const p = await desk(b, 'featured/everyday-b/index.html#/product/demo')
    await p.getByRole('button', { name: 'Size 41' }).click(); await p.waitForTimeout(300)
    await mark(p, 'product', ['[aria-label="Black"]', 'button[aria-label="Size 38"]', 'text=Size guide', 'button:has-text("ADD TO BAG")'])
    await snap(p, 'product')
  },
  async 'bag'(b) {
    const p = await desk(b, 'featured/everyday-b/index.html#/product/demo')
    await p.getByRole('button', { name: 'Size 41' }).click()
    await p.getByRole('button', { name: 'ADD TO BAG' }).click(); await p.waitForTimeout(1200); await snap(p, 'bag')
  },
  async 'mobile-home'(b) { const p = await mob(b, 'featured/everyday-a/index.html#/'); await snap(p, 'mobile-home') },
  async 'technology'(b) {
    const p = await desk(b, 'featured/everyday-a/index.html#/technology'); await p.mouse.wheel(0, 700); await p.waitForTimeout(900); await snap(p, 'technology')
  },
  async 'finder-a'(b) {
    const p = await desk(b, 'concept-set-a/index.html#/concept-04')
    await p.getByText('1. ซื้อให้ใคร?').scrollIntoViewIfNeeded(); await p.waitForTimeout(500); await snap(p, 'finder-a')
  },
  async 'finder-b'(b) {
    const p = await desk(b, 'concept-set-b/GAMBOL-All-5-Concepts.html#/concept-04'); await snap(p, 'finder-b')
  },
  async 'switch-a'(b) { const p = await desk(b, 'concept-set-a/index.html#/concept-01'); await snap(p, 'switch-a', { clip: { x: 0, y: 760, width: 1440, height: 140 } }) },
  async 'switch-b'(b) { const p = await desk(b, 'concept-set-b/GAMBOL-All-5-Concepts.html#/concept-01'); await snap(p, 'switch-b', { clip: { x: 0, y: 0, width: 1440, height: 130 } }) },
}

async function desk(b, url) { return open(b, url, { width: 1440, height: 900 }) }
async function mob(b, url) { return open(b, url, { width: 390, height: 844 }, true) }
async function open(b, url, viewport, mobile = false) {
  const ctx = await b.newContext({ viewport, deviceScaleFactor: mobile ? 2 : 1, isMobile: mobile, hasTouch: mobile })
  const p = await ctx.newPage(); await p.goto(BASE + url); await p.waitForTimeout(2800); return p
}
async function snap(p, name, opts = {}) {
  await p.screenshot({ path: path.join(OUT, name + '.jpg'), type: 'jpeg', quality: 80, ...opts })
  console.log('✓', name); await p.context().close()
}

;(async () => {
  const b = await chromium.launch({ channel: 'chrome' })
  for (const [name, fn] of Object.entries(shots)) {
    if (only.length && !only.includes(name)) continue
    try { await fn(b) } catch (e) { console.log('✗', name, e.message.split('\n')[0]) }
  }
  await b.close()
  fs.writeFileSync(ANN, JSON.stringify(ann, null, 1))
})()
