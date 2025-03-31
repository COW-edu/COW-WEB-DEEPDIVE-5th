import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $lib: path.resolve("./src/lib"),
    },
  },
  plugins: [react()],
});
