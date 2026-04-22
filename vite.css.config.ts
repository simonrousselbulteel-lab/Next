import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: { style: resolve(__dirname, 'src/style.css') },
      output: {
        assetFileNames: '[name][extname]',
      },
    },
    emptyOutDir: false,
  },
});
