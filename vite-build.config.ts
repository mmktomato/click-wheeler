import { defineConfig } from "vite";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: {
        "click-wheeler": "./src/click-wheeler/index.ts",
      },
      formats: ["es"],
      fileName: "click-wheeler.[format]",
    },
  },
});
