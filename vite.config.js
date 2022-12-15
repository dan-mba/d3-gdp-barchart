import { defineConfig } from 'vite';
import {createHtmlPlugin} from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    createHtmlPlugin()
  ],
  server: {
    port: 8080,
  },
  build: {
    outDir: 'docs',
    rollupOptions: {
      input: './index.html',
    },
  },
  base: './'
})