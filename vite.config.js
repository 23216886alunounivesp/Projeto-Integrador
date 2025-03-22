// vite.config.js
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react'; // Adicione esta linha

export default defineConfig({
  plugins: [
    react(), // Plugin do React deve vir primeiro
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png', 'pwa-512x512.png'], // Lista de assets
      manifest: {
        name: 'Pilates PWA',
        short_name: 'Pilates',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: 'pwa-192x192.png', // Caminho relativo (sem / inicial)
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any' // Alterado para melhor compatibilidade
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png}'], // Padrões para cache
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|svg)$/,
            handler: 'CacheFirst'
          }
        ]
      },
      strategies: 'generateSW' // Força geração do Service Worker
    })
  ]
});