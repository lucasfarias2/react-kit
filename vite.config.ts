import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    minify: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(__dirname, '/src/client/entries/home/home.html'),
      },
    },
  },
  // test: {
  //   environment: 'happy-dom',
  //   setupFiles: ['./setupVitest.js'],
});
