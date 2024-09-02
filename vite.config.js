import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    lib: {
      entry: './src/index.js',
      name: 'EKB',
      formats: ['es', 'cjs', 'umd'],
      fileName: (format) => `ekb.${format}.js`,
    },
    minify: 'terser',
    terserOptions: {
      format: {
        beautify: false,
      },
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: true,
    },
  },
});
