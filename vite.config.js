import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Sitemap from 'vite-plugin-sitemap'
import { blogData } from './src/data/blogData.js'

// Extract dynamic routes from your blog data
const dynamicRoutes = blogData.map(article => `/blog/${article.slug}`);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Sitemap({ 
      hostname: 'https://followercompare.conway.im',
      dynamicRoutes: dynamicRoutes,
      readable: true 
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Needed for Docker mapping
    port: 5173,
    watch: {
      usePolling: true // Needed for Docker on some systems (Windows/Mac)
    }
  }
})