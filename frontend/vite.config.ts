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
      '~app': path.resolve(__dirname, './src/app'),
      '~assets': path.resolve(__dirname, './src/assets'),
      '~components': path.resolve(__dirname, './src/components'),
      '~context': path.resolve(__dirname, './src/context'),
      '~hooks': path.resolve(__dirname, './src/hooks'),
      '~pages': path.resolve(__dirname, './src/pages'),
      '~services': path.resolve(__dirname, './src/services'),
      '~types': path.resolve(__dirname, './src/types'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~features': path.resolve(__dirname, 'src/features'),
      '~auth': path.resolve(__dirname, 'src/features/auth'),
      '~calendar': path.resolve(__dirname, 'src/features/calendar'),
      '~dashboard': path.resolve(__dirname, 'src/features/dashboard'),
      '~shared': path.resolve(__dirname, 'src/features/shared'),
      '~tasks': path.resolve(__dirname, 'src/features/tasks'),
      '~users': path.resolve(__dirname, 'src/features/users'),
    },
  },
})
