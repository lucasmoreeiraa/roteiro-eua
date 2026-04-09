import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/data/')) return 'trip-data'
          if (!id.includes('node_modules')) return undefined

          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.includes('lucide-react')) return 'icons'
          if (id.includes('react')) return 'react-vendor'

          return 'vendor'
        },
      },
    },
  },
})