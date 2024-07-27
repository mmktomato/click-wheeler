import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'click-wheeler',
  outputTargets: [
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
      externalRuntime: false,
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
