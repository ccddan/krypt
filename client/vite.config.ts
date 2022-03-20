import path from "path";
import { defineConfig } from "vite";

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
    },
  }
});
