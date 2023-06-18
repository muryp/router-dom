import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  outDir: './web/muryp',
  srcDir:'./example',
  compressHTML:true,
  base:'/'
})
