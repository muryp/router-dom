import { defineConfig } from 'astro/config'

const BASE_URL = import.meta.env.MODE === 'development' ? '' : '/muryp'
export default defineConfig({
  outDir: './web/muryp',
  srcDir: './example',
  compressHTML: true,
  base: BASE_URL,
})
