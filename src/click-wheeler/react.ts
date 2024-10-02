import React from "react";
import { createComponent } from "@lit/react";

import { ClickWheeler } from "./";

export const ClickWheelerComponent = createComponent({
  tagName: "click-wheeler",
  elementClass: ClickWheeler,
  react: React,
  events: {
    onRotate: "rotate",
    onTap: "tap",
  },
});
