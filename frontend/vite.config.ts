import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    watch: {
      usePolling: true,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '~api': path.resolve(__dirname, './src/api'),
      '~assets': path.resolve(__dirname, './src/assets'),
      '~components': path.resolve(__dirname, './src/components'),
      '~context': path.resolve(__dirname, './src/context'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~types': path.resolve(__dirname, './src/types'),
      '~utils': path.resolve(__dirname, './src/utils'),
    },
  },
})
