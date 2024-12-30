import { type ClickWheelerRotateEvent, type ClickWheelerTapEvent } from "./click-wheeler/events";
export { type ClickWheelerRotateEvent, type ClickWheelerTapEvent };

export declare class HTMLClickWheelerElement extends HTMLElement {
  size?: number;
  requireShiftToRotate?: boolean;
  constructor();

  addEventListener(
    type: "rotate",
    listener: (event: ClickWheelerRotateEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: "tap",
    listener: (event: ClickWheelerTapEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: "rotate",
    listener: (event: ClickWheelerRotateEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener(
    type: "tap",
    listener: (event: ClickWheelerTapEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof HTMLElementEventMap>(
    type: K,
    listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
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
