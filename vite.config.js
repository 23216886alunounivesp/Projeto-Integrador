import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
//import manifest from './manifest.json'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  VitePWA({
      registerType: 'autoUpdate',
      //add this to cache all the imports
      workbox: {
        globPatterns: ['**/*'],
      },
      //add this to cache all static assets in the public folder
      includeAssets: ['**/*'],
      manifest: {
        "name": "Escola de Pilates",
        "short_name": "Pilates",
        "start_url": ".",
        "display": "standalone", /*Esconde a barra de tarefas no desktop */
        "background_color": "#ffffff",
        "theme_color": "#007bff",
        "icons": [
          {
            "src": "pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ],
})