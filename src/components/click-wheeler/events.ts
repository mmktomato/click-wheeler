import { EventEmitter } from "@stencil/core";

import { type Direction } from "../../utils/utils";

export interface RotateEventDetail {
  direction: Direction;
  velocity: number;
}

export type IconTapArea = "forward" | "backward" | "playPause" | "menu";
type TapArea = IconTapArea | "center";

export interface TapEventDetail {
  type: "tap" | "long-tap";
  tapArea: TapArea;
}

export const handlePointerDownForTap = (
  tapEvent: EventEmitter<TapEventDetail> | undefined,
  tapArea: TapArea,
  onEmitting: () => void,
): number => {
  return window.setTimeout(() => {
    onEmitting();
    tapEvent?.emit({ type: "long-tap", tapArea });
  }, 1000);
};

export const handlePointerUpForTap = (
  tapEvent: EventEmitter<TapEventDetail> | undefined,
  longTapTimer: number | undefined,
  tapArea: TapArea,
) => {
  if (longTapTimer !== undefined) {
    window.clearTimeout(longTapTimer);
    tapEvent?.emit({ type: "tap", tapArea });
  }
};

export const handlePointerMoveForTap = (longTapTimer: number | undefined) => {
  window.clearTimeout(longTapTimer);
};
