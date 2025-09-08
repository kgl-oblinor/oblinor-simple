import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    host: true
  },
  preview: {
    port: 5174,
    host: true
  },
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/pages': '/src/pages',
      '@/services': '/src/services',
      '@/hooks': '/src/hooks',
      '@/utils': '/src/utils',
      '@/types': '/src/types',
      '@/constants': '/src/constants',
      '@/context': '/src/context',
      '@/assets': '/src/assets'
    }
  }
})