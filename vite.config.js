import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.', // <- this should be the root directory if index.html is in the root
  build: {
    outDir: 'dist',
  }
})
