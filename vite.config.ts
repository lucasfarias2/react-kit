import react from '@vitejs/plugin-react';
import analyze from 'rollup-plugin-analyzer'
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    minify: true,
    emptyOutDir: true,
    rollupOptions: {
      plugins: [analyze()],
      input: {
        home: resolve(__dirname, '/src/client/entries/home/home.html'),
      },
    },
  },
  test: {
    environment: 'happy-dom',
    setupFiles: ['./src/config/setupVitest.ts'],
  },
});
