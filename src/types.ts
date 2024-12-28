export { type ClickWheelerRotateEvent, type ClickWheelerTapEvent } from "./click-wheeler/events";

export declare class HTMLClickWheelerElement extends HTMLElement {
  size?: number;
  requireShiftToRotate?: boolean;
  constructor();
}

interface ClickWheelerProps {
  size?: number;
  requireShiftToRotate?: boolean;
  class?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    "click-wheeler": HTMLClickWheelerElement;
  }

  namespace JSX {
    interface IntrinsicElements {
      "click-wheeler": ClickWheelerProps;
    }
  }
}
