import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src'),
      '@components': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/components'),
      '@views': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/Views'),
      '@layout': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/layout'),
      '@utils': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/utils'),
      '@services': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/services'),
      '@store': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/store'),
      '@assets': path.resolve(path.dirname(fileURLToPath(import.meta.url)), './src/assets'),
    },
  },
})
