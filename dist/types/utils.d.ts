export type Area = "top" | "left" | "bottom" | "right";
export interface Rect {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare const hitTest: (point: Point, boundingClientRect: Rect, circleSize: number) => Area | null;
export interface Point {
    x: number;
    y: number;
}
export type Direction = "clockwise" | "counter-clockwise";
export interface AccumulatedDistance {
    distance: number;
    direction: Direction;
}
export declare const getDirection: (area: Area, from: Point, to: Point) => Direction | null;
export declare const getDistance: (from: Point, to: Point) => number;
export declare const getTotalDistance: (from: Point, to: Point, direction: Direction, accDistance: AccumulatedDistance) => AccumulatedDistance;
