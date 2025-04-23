import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/app.ts'),
      name: 'murypRouterDom',
      formats: ['es', 'cjs'],
      fileName: 'app',
    },
    rollupOptions: {
      // No input for HTML files since this is a library build
    },
  },
  plugins: [
    dts({
      tsConfigFilePath: resolve(__dirname, 'tsconfig.vite.json'),
    }),
  ],
});
