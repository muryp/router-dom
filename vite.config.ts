import { defineConfig } from 'vite';
import { ViteMurypJsLiteral } from '@muryp/vite-html';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: '/foo/',
  server: {
    // Agar saat dev mode (npm run dev) langsung mengarah ke /foo/
    open: '/foo/',
  },
  plugins: [
    ViteMurypJsLiteral({
      minify: {
        html: false,
        css: false,
      },
    }),
    tsconfigPaths(),
  ],
});
