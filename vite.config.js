import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import eslint from "vite-plugin-eslint";
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [
   
    react(),
    svgr({
      svgrOptions: {
        ref: true,
      },
    }),
    eslint(),
  ],
  resolve: {
    /*eslint-disable */
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      assets: `${path.resolve(__dirname, "./src/assets/")}`,
      components: `${path.resolve(__dirname, "./src/components/")}`,
      images: `${path.resolve(__dirname, "./src/components/Images/")}`,
      data: `${path.resolve(__dirname, "./src/data/")}`,
      helpers: `${path.resolve(__dirname, "./src/helpers/")}`,
      hooks: `${path.resolve(__dirname, "./src/hooks/")}`,
      pages: `${path.resolve(__dirname, "./src/pages/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      router: `${path.resolve(__dirname, "./src/router/")}`,
    },
  },
  server: {
    port: 3001,
    host: true
  },
});
