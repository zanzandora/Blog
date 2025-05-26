import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  esbuild: {
    target: 'es2022',
  },
  plugins: [
    react(),
    tsconfigPaths({
      projects: ['./tsconfig.app.json'], // Chỉ định plugin dùng tsconfig.app.json
    }),
  ],
  build: {
    outDir: '../dist/client',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
