import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import analyze from 'rollup-plugin-analyzer';
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
