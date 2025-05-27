// tsup.config.ts
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['esm'], // hoặc ['cjs'] nếu không dùng ESM
  target: 'node20',
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true, // xuất file .d.ts nếu bạn export module
});
