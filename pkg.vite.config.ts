import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'murypRouterDom',
      formats: ['es','cjs'],
      fileName: 'index'
    }
  },
  plugins: [dts({
    tsConfigFilePath:resolve(__dirname, 'tsconfig.vite.json')
  })]
})
