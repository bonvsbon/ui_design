// Renders guide.html (+ screenshot annotations) to guide/GAMBOL-Demo-Guide.pdf.
//   NODE_PATH=designs/concept-set-b/node_modules node guide/_build/build-guide.cjs
// Refresh the screenshots first with capture.cjs when the site changes.
const { chromium } = require('playwright')
const fs = require('fs')
const path = require('path')

const dir = __dirname
const ann = fs.readFileSync(path.join(dir, 'shots/annotations.json'), 'utf8')
const html = fs.readFileSync(path.join(dir, 'guide.html'), 'utf8').replace('/*ANN*/{}', ann)
const tmp = path.join(dir, '.render.html')
fs.writeFileSync(tmp, html)
const out = path.join(dir, '..', 'GAMBOL-Demo-Guide.pdf')

;(async () => {
  const b = await chromium.launch({ channel: 'chrome' })
  const p = await b.newPage()
  await p.goto('file://' + tmp, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  await p.waitForTimeout(800)
  // Every page is a fixed A4 sheet; report any whose content no longer fits.
  const over = await p.evaluate(() => [...document.querySelectorAll('.pg')].map((pg, i) => {
    const inner = pg.querySelector('.inner')
    return inner && inner.scrollHeight > inner.clientHeight + 1 ? `page ${i + 1}: +${inner.scrollHeight - inner.clientHeight}px` : null
  }).filter(Boolean))
  if (over.length) console.log('⚠ overflow —', over.join(', '))
  await p.pdf({ path: out, printBackground: true, preferCSSPageSize: true })
  await b.close()
  fs.unlinkSync(tmp)
  console.log('✓', out, (fs.statSync(out).size / 1e6).toFixed(1) + ' MB')
})()
