import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';

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
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/', // Quan trọng cho Vercel
});
