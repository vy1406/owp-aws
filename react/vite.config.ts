import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
     proxy: {
      // Proxy all requests to the API Gateway domain
      '/api': {
        target: 'https://v86g98hnxc.execute-api.us-east-1.amazonaws.com/prod',
      },
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  }
})
