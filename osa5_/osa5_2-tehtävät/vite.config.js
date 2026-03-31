import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/fullstackopen/puhelinluettelo/api': {
        target: 'http://192.168.0.179:8888',
        changeOrigin: true
      }
    }
  }
})
