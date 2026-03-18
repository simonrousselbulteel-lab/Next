import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    // Tailwind v4 Vite plugin — must be listed BEFORE vue()
    tailwindcss(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@tokens': resolve(__dirname, './tokens/build'),
      '@components': resolve(__dirname, './components'),
      '@composables': resolve(__dirname, './composables'),
    },
  },
  build: {
    outDir: 'dist',
  },
});
