import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port: 3000,
    base: '/', // Adjust if your app is served from a subdirectory
  build: {
    outDir: 'dist',
  },
    proxy:{
      "/api":{
        target:"http://localhost:5000",
      },
    },
  },
});
