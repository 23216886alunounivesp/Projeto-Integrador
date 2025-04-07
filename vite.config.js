import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*'],
        runtimeCaching: [
          {
            urlPattern: '/',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'offline-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60, // 1 week
              },
            },
          },
        ],
      },
      includeAssets: ['**/*'],
      manifest: {
        name: "Escola de Pilates",
        short_name: "Pilates",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#007bff",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any maskable"
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    include: ['react', 'react-dom']
  },
  build: {
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    hmr: {
      host: 'localhost',
    },
  },
});