import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
