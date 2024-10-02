import { type LitElement } from "lit";
import { type Direction } from "../utils";

export type IconTapArea = "forward" | "backward" | "playPause" | "menu";
type TapArea = IconTapArea | "center";

export interface RotateEventDetail {
  direction: Direction;
  velocity: number;
}

export interface TapEventDetail {
  type: "tap" | "long-tap";
  tapArea: TapArea;
}

export type ClickWheelerRotateEvent = CustomEvent<RotateEventDetail>;
export type ClickWheelerTapEvent = CustomEvent<TapEventDetail>;

export const dispatchRotateEvent = (target: LitElement, detail: RotateEventDetail) => {
  const ev = new CustomEvent<RotateEventDetail>("rotate", {
    bubbles: true,
    composed: true,
    detail,
  });
  target.dispatchEvent(ev);
};

const dispatchTapEvent = (target: LitElement, detail: TapEventDetail) => {
  const ev = new CustomEvent<TapEventDetail>("tap", {
    bubbles: true,
    composed: true,
    detail,
  });
  target.dispatchEvent(ev);
};

export const handlePointerDownForTap = (
  eventTarget: LitElement,
  tapArea: TapArea,
  onEmitting: () => void,
): number => {
  return window.setTimeout(() => {
    onEmitting();
    dispatchTapEvent(eventTarget, { type: "long-tap", tapArea });
  }, 1000);
};

export const handlePointerUpForTap = (
  eventTarget: LitElement,
  longTapTimer: number | undefined,
  tapArea: TapArea,
) => {
  if (longTapTimer !== undefined) {
    window.clearTimeout(longTapTimer);
    dispatchTapEvent(eventTarget, { type: "tap", tapArea });
  }
};

export const handlePointerLeaveForTap = (longTapTimer: number | undefined) => {
  window.clearTimeout(longTapTimer);
};
