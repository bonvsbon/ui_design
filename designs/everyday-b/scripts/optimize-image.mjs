/** Optional local asset utility: npm exec -- node scripts/optimize-image.mjs source.png public/images/name.webp */
import sharp from 'sharp'
import path from 'node:path'
const [source, destination] = process.argv.slice(2)
if (!source || !destination || !destination.endsWith('.webp'))
  throw new Error('Pass a source image and an output .webp path.')
if (path.resolve(source) === path.resolve(destination))
  throw new Error('Use a separate output path to preserve the source image.')
await sharp(source)
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(destination)
console.log(destination)
