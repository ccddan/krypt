import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@project/config': path.resolve(__dirname, '.', 'src', 'config', 'index.ts'),
      '@project/config/*': path.resolve(__dirname, '.', 'src', 'config', '*'),
      '@project/blockchain': path.resolve(__dirname, '.', 'src', 'blockchain', 'index.ts'),
      '@project/blockchain/*': path.resolve(__dirname, '.', 'src', 'blockchain', '*'),
      '@project/context': path.resolve(__dirname, '.', 'src', 'context', 'index.tsx'),
      '@project/context/*': path.resolve(__dirname, '.', 'src', 'context', '*'),
    },
  }
});
