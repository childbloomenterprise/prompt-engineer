/* Compile the ELPROM JSX files (elprom/js/*.jsx) to plain JS via esbuild.
 * Drops the in-browser Babel dependency. Run: node scripts/build-elprom.mjs */
import { transform } from 'esbuild'
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const JS = join(__dirname, '..', 'elprom', 'js')

const files = [
  'components',
  'frames',
  'data',
  'engine',
  'landing',
  'result',
  'dashboard',
  'tweaks-panel',
  'app',
]

for (const name of files) {
  const src = await readFile(join(JS, name + '.jsx'), 'utf8')
  const { code } = await transform(src, {
    loader: 'jsx',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
  })
  await writeFile(join(JS, name + '.build.js'), code, 'utf8')
  console.log(`✓ elprom/js/${name}.jsx → ${name}.build.js`)
}
