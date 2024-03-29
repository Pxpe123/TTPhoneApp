import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: './src',
  build: {
    outDir: '../dist',
    minify: false,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
    },
  },
  optimizeDeps: {
    include: ['@capacitor/haptics'],
  },
});
