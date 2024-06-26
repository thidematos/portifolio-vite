import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    host: '127.0.0.1',
    proxy: {
      '/api/v1': 'http://127.0.0.1:3000',
    },
  },
});
