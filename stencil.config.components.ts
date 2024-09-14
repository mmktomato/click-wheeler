import { Config } from "@stencil/core";
import { inlineSvg } from "stencil-inline-svg";

export const config: Config = {
  namespace: "click-wheeler",
  outputTargets: [
    {
      type: "dist-custom-elements",
      customElementsExportBehavior: "auto-define-custom-elements",
      externalRuntime: false,
    },
  ],
  plugins: [inlineSvg()],
};
