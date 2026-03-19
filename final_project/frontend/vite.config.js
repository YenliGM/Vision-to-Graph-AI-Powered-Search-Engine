/**
 * @fileoverview Vite Configuration - Vision-to-Graph Frontend
 * Professional setup including a development proxy to handle CORS 
 * and Codespaces port forwarding seamlessly.
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // Port 5173 is standard for Vite
    port: 5173,
    strictPort: true,
    // Configuration for the development proxy
    proxy: {
      // Any request starting with /api will be redirected to the Backend
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        // Rewrites the path if necessary (optional)
        // rewrite: (path) => path.replace(/^\/api/, '') 
      }
    },
    // Required for HMR (Hot Module Replacement) to work in Codespaces
    hmr: {
      clientPort: 443,
    },
    // Ensures the server is accessible via the network
    host: '0.0.0.0'
  }
})