import { loadNuxt } from 'nuxt'
import { buildNuxt } from '@nuxt/kit'
import { build as bundle } from 'esbuild'
import { parse as parseSFC } from '@vue/compiler-sfc'
import { baseParse } from '@vue/compiler-dom'
import MagicString from 'magic-string'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'

const root = fileURLToPath(new URL('../', import.meta.url))
const work = path.join(root, '.portable-build')
const output = path.join(root, 'portable', 'GAMBOL-Portable')
const cache = path.join(work, 'cache')
await fs.mkdir(cache, { recursive: true })
await fs.mkdir(output, { recursive: true })

// Inject the resolver only into this export, leaving the Nuxt web project intact.
const plugin = path.join(work, 'assets.client.ts')
await fs.writeFile(
  plugin,
  `export default defineNuxtPlugin(() => ({ provide: {
  portableAsset: (value: string | undefined) => (globalThis as any).__GAMBOL_RESOLVE_ASSET__(value)
} }))`
)

const portableImages = {
  name: 'gambol-embed-image-references',
  enforce: 'pre',
  transform(source, id) {
    if (!id.endsWith('.vue') || id.includes('node_modules')) return
    const { descriptor } = parseSFC(source)
    if (!descriptor.template) return
    const offset = descriptor.template.loc.start.offset
    const edited = new MagicString(source)
    function visit(node) {
      if (node.type === 1 && node.tag === 'a') {
        for (const prop of node.props) {
          if (prop.type === 6 && prop.name === 'href' && prop.value?.content.startsWith('#')) {
            const expression = `'#' + $route.fullPath.split('#')[0] + ${JSON.stringify(prop.value.content)}`
            edited.overwrite(
              offset + prop.loc.start.offset,
              offset + prop.loc.end.offset,
              `:href="${expression.replaceAll('"', '&quot;')}"`
            )
          }
        }
      }
      if (node.type === 1 && ['img', 'source'].includes(node.tag)) {
        for (const prop of node.props) {
          let name, expression
          if (prop.type === 6 && ['src', 'srcset'].includes(prop.name) && prop.value) {
            name = prop.name
            expression = JSON.stringify(prop.value.content)
          } else if (
            prop.type === 7 &&
            prop.name === 'bind' &&
            ['src', 'srcset'].includes(prop.arg?.content) &&
            prop.exp
          ) {
            name = prop.arg.content
            expression = prop.exp.content
          }
          if (name) {
            const wrapped = `$portableAsset(${expression})`
              .replaceAll('&', '&amp;')
              .replaceAll('"', '&quot;')
            edited.overwrite(
              offset + prop.loc.start.offset,
              offset + prop.loc.end.offset,
              `:${name}="${wrapped}"`
            )
          }
        }
      }
      for (const child of node.children || []) visit(child)
    }
    visit(baseParse(descriptor.template.content))
    return { code: edited.toString(), map: edited.generateMap({ hires: true }) }
  },
}

if (!process.argv.includes('--reuse-build')) {
  const nuxt = await loadNuxt({
    cwd: root,
    dev: false,
    overrides: {
      ssr: false,
      telemetry: false,
      buildDir: path.join(work, 'nuxt'),
      plugins: [plugin],
      router: { options: { hashMode: true } },
      experimental: { appManifest: false, payloadExtraction: false },
      vite: {
        build: { modulePreload: false, cssCodeSplit: false },
        plugins: [portableImages],
      },
      nitro: {
        preset: 'static',
        output: { dir: path.join(work, 'output') },
        prerender: { crawlLinks: false, routes: ['/'], ignore: [] },
      },
    },
  })
  nuxt.options.app.head.link = []
  await buildNuxt(nuxt)
  await nuxt.close()
}

const publicDir = path.join(work, 'output', 'public')
const shell = await fs.readFile(path.join(publicDir, 'index.html'), 'utf8')
const entry = shell.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)[1]
const bundled = await bundle({
  entryPoints: [path.join(publicDir, entry)],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: ['es2022'],
  minify: true,
  write: false,
  legalComments: 'inline',
  define: { 'import.meta.url': 'globalThis.location.href' },
  loader: { '.css': 'empty' },
})
const script = bundled.outputFiles[0].text
const styles = []
for (const name of await fs.readdir(path.join(publicDir, '_nuxt'))) {
  if (name.endsWith('.css'))
    styles.push(await fs.readFile(path.join(publicDir, '_nuxt', name), 'utf8'))
}

async function download(url, filename) {
  const dest = path.join(cache, filename)
  try {
    return await fs.readFile(dest)
  } catch {}
  const response = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 Chrome/130.0.0.0 Safari/537.36' },
  })
  if (!response.ok) throw new Error(`Could not download ${url}: ${response.status}`)
  const data = Buffer.from(await response.arrayBuffer())
  await fs.writeFile(dest, data)
  return data
}

const fontURL =
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Thai:wght@400;500;600;700&display=swap'
let fontCSS = (await download(fontURL, 'fonts.css')).toString()
const fontURLs = [...new Set([...fontCSS.matchAll(/url\((https:[^)]+)\)/g)].map((m) => m[1]))]
for (const url of fontURLs) {
  const data = await download(url, createHash('sha256').update(url).digest('hex') + '.font')
  const mime = url.endsWith('.ttf') ? 'font/ttf' : 'font/woff2'
  fontCSS = fontCSS.replaceAll(url, `data:${mime};base64,` + data.toString('base64'))
}
await fs.mkdir(path.join(output, 'Licenses'), { recursive: true })
const fontLicenses = []
for (const name of ['barlowcondensed', 'bodonimoda', 'manrope', 'notosansthai']) {
  const license = await download(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${name}/OFL.txt`,
    `${name}-OFL.txt`
  )
  fontLicenses.push(`${name}\n${license.toString()}`)
  await fs.writeFile(path.join(output, 'Licenses', `${name}-OFL.txt`), license)
}

const assets = {}
for (const name of await fs.readdir(path.join(root, 'public', 'images'))) {
  const source = path.join(root, 'public', 'images', name)
  let data = await fs.readFile(source)
  let type = name.endsWith('.png') ? 'image/png' : 'image/jpeg'
  if (name.endsWith('.png')) {
    const webp = path.join(cache, name + '.webp')
    try {
      execFileSync('cwebp', ['-quiet', '-q', '88', source, '-o', webp])
      const compressed = await fs.readFile(webp)
      if (compressed.length < data.length) {
        data = compressed
        type = 'image/webp'
      }
    } catch {
      /* Original image remains a valid, portable fallback. */
    }
  }
  assets['/images/' + name] = [type, data.toString('base64')]
}
const favicon =
  'data:image/svg+xml;base64,' +
  (await fs.readFile(path.join(root, 'public', 'favicon.svg'))).toString('base64')
const config = shell.match(/<script>(window\.__NUXT__=[\s\S]*?)<\/script>/)?.[1]
if (!config) throw new Error('Nuxt runtime configuration not found')
const safeScript = (text) => text.replace(/<\/script/gi, '<\\/script')

function html(start, title) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>GAMBOL — ${title}</title><link rel="icon" href="${favicon}"><style>${fontCSS}\n${styles.join('\n')}</style></head>
<body><div id="__nuxt"></div><noscript>กรุณาเปิด JavaScript เพื่อทดลองเว็บไซต์ GAMBOL / Enable JavaScript to open this prototype.</noscript>
<script>
if (!location.hash || location.hash === '#') location.replace(location.href.split('#')[0] + ${JSON.stringify('#' + start)});
const embeddedAssets = ${JSON.stringify(assets)};
const assetURLs = {};
for (const [name, [mime, base64]] of Object.entries(embeddedAssets)) {
  const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
  assetURLs[name] = URL.createObjectURL(new Blob([bytes], { type: mime }));
}
globalThis.__GAMBOL_RESOLVE_ASSET__ = value => typeof value === 'string' ? value.replace(new RegExp('/images/[a-zA-Z0-9_.-]+', 'g'), path => assetURLs[path] || path) : value;
${safeScript(config)}
</script><script>${safeScript(script)}</script><script type="text/plain" id="font-licenses">${safeScript(fontLicenses.join('\n\n'))}</script></body></html>`
}

const entries = [
  ['GAMBOL-All-5-Concepts.html', '/overview', 'All five concepts'],
  ['Concept-01-Premium-Street.html', '/concept-01', 'Premium Street'],
  ['Concept-02-Bold-Sport.html', '/concept-02', 'Bold Sport'],
  ['Concept-03-Lifestyle-Stories.html', '/concept-03', 'Lifestyle Stories'],
  ['Concept-04-Smart-Commerce.html', '/concept-04', 'Smart Commerce'],
  ['Concept-05-Future-Footwear.html', '/concept-05', 'Future Footwear'],
]
for (const [name, route, title] of entries) {
  await fs.writeFile(path.join(output, name), html(route, title))
  console.log('PORTABLE', name)
}
await fs.copyFile(path.join(root, 'docs', 'ASSETS.md'), path.join(output, 'ASSET-CREDITS.md'))
await fs.copyFile(
  path.join(root, 'docs', 'PORTABLE-README.txt'),
  path.join(output, 'START-HERE.txt')
)
execFileSync('zip', ['-q', '-r', '-X', 'GAMBOL-Portable-All-5.zip', 'GAMBOL-Portable'], {
  cwd: path.join(root, 'portable'),
})
console.log(`Portable files saved to ${output}`)
