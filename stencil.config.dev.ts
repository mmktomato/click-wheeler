import { Config } from "@stencil/core";
import { inlineSvg } from "stencil-inline-svg";

export const config: Config = {
  namespace: "click-wheeler",
  srcDir: "./demo",
  outputTargets: [
    {
      type: "www",
      serviceWorker: null, // disable service workers
      copy: [{ src: "index.js" }, { src: "index.css" }],
    },
  ],
  plugins: [inlineSvg()],
};
