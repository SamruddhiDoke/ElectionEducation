import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Optimized Vite config: absolute imports, build chunking, and test runner
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Absolute imports for cleaner code and better tree-shaking
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Optimized: manual chunking (function form required by Rolldown/Vite 8)
        // Separates vendor and router into dedicated cacheable chunks
        manualChunks(id) {
          if (id.includes('node_modules/react-router-dom') || id.includes('node_modules/react-router')) {
            return 'router';
          }
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor';
          }
        },
      },
    },
    // Optimized: Vite 8 uses Oxc transformer by default (faster than esbuild)
    target: 'es2015',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.js',
  },
});
