import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig({
  plugins: [
    ViteMinifyPlugin({})
  ],
  server: {
    port: 8080,
  },
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
  base: './'
})