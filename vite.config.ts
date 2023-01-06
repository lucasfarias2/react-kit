import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  root: 'src',
  // test: {
  //   environment: 'happy-dom',
  //   setupFiles: ['./setupVitest.js'],
  // },
});
