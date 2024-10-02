import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: {
        "click-wheeler": "./src/click-wheeler/index.ts",
        "click-wheeler-react": "./src/click-wheeler/react.ts",
      },
      formats: ["es"],
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ["react"],
    },
  },
});
