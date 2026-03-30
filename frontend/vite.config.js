import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "Realtime Dating App",
        short_name: "DatingApp",
        start_url: ".",
        display: "standalone",
        theme_color: "#667eea",
        background_color: "#764ba2",
        icons: [
          { src: "favicon-192.png", sizes: "192x192", type: "image/png" },
          { src: "favicon-512.png", sizes: "512x512", type: "image/png" }
        ]
      }
    })
  ]
});