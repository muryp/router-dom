import { resolve } from "path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true
    })
  ],
  build: {
    outDir: "./dist",
    lib: {
      entry: {
        index: resolve(__dirname, "./src/index.ts")
      },
      formats: ["cjs", "es"],
    },
  },
});
