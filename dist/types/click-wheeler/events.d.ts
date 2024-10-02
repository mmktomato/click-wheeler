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
export declare const dispatchRotateEvent: (target: LitElement, detail: RotateEventDetail) => void;
export declare const handlePointerDownForTap: (eventTarget: LitElement, tapArea: TapArea, onEmitting: () => void) => number;
export declare const handlePointerUpForTap: (eventTarget: LitElement, longTapTimer: number | undefined, tapArea: TapArea) => void;
export declare const handlePointerLeaveForTap: (longTapTimer: number | undefined) => void;
export {};
