import { describe, expect, it } from "@jest/globals";

import {
  getDirection,
  getDistance,
  hitTest,
  getTotalDistance,
  type Point,
  type Rect,
  type Direction,
  type AccumulatedDistance,
  type Area,
} from "./utils";

const createCircleElementRect = (circleSize: number, circleOffset: Point): Rect => {
  return {
    x: circleOffset.x,
    y: circleOffset.y,
    width: circleSize,
    height: circleSize,
  };
};

describe("hitTest", () => {
  const circleSize = 300;
  const circleOffset: Point = { x: 50, y: 50 };
  const rect = createCircleElementRect(circleSize, circleOffset);

  type Params = {
    x: number;
    y: number;
    expected: Area;
  };
  it.each<Params>`
    x      | y      | expected
    ${150} | ${10}  | ${"top"}
    ${250} | ${150} | ${"right"}
    ${150} | ${250} | ${"bottom"}
    ${10}  | ${150} | ${"left"}
  `("should return correct area ($expected)", ({ x, y, expected }) => {
    const area = hitTest({ x: circleOffset.x + x, y: circleOffset.y + y }, rect, circleSize);
    expect(area).toBe(expected);
  });
});

describe("getDirection", () => {
  type Params = {
    area: Area;
    from: Point;
    to: Point;
    expected: Direction | null;
  };
  it.each<Params>`
    area        | from                 | to                   | expected
    ${"top"}    | ${{ x: 80, y: 10 }}  | ${{ x: 80, y: 10 }}  | ${null}
    ${"top"}    | ${{ x: 80, y: 10 }}  | ${{ x: 90, y: 10 }}  | ${"clockwise"}
    ${"top"}    | ${{ x: 80, y: 10 }}  | ${{ x: 70, y: 10 }}  | ${"counter-clockwise"}
    ${"right"}  | ${{ x: 180, y: 80 }} | ${{ x: 180, y: 80 }} | ${null}
    ${"right"}  | ${{ x: 180, y: 80 }} | ${{ x: 180, y: 90 }} | ${"clockwise"}
    ${"right"}  | ${{ x: 180, y: 80 }} | ${{ x: 180, y: 70 }} | ${"counter-clockwise"}
    ${"bottom"} | ${{ x: 80, y: 270 }} | ${{ x: 80, y: 270 }} | ${null}
    ${"bottom"} | ${{ x: 80, y: 270 }} | ${{ x: 70, y: 270 }} | ${"clockwise"}
    ${"bottom"} | ${{ x: 80, y: 270 }} | ${{ x: 90, y: 270 }} | ${"counter-clockwise"}
    ${"left"}   | ${{ x: 10, y: 80 }}  | ${{ x: 10, y: 80 }}  | ${null}
    ${"left"}   | ${{ x: 10, y: 80 }}  | ${{ x: 10, y: 70 }}  | ${"clockwise"}
    ${"left"}   | ${{ x: 10, y: 80 }}  | ${{ x: 10, y: 90 }}  | ${"counter-clockwise"}
  `("should return correct direction ($area)", ({ area, from, to, expected }) => {
    const direction = getDirection(area, from, to);
    expect(direction).toBe(expected);
  });
});

describe("getDistance", () => {
  it("shoud return correct distance", () => {
    const from: Point = { x: 0, y: 0 };
    const to: Point = { x: 3, y: 4 };
    const distance = getDistance(from, to);
    expect(distance).toEqual(5);
  });
});

describe("getTotalDistance", () => {
  it("should return correct totalDistance (same direction)", () => {
    const from: Point = { x: 0, y: 0 };
    const to: Point = { x: 3, y: 4 };
    const direction: Direction = "clockwise";
    const accDistance: AccumulatedDistance = {
      distance: 10,
      direction: "clockwise",
    };

    const totalDistance = getTotalDistance(from, to, direction, accDistance);
    expect(totalDistance).toEqual({
      distance: 15,
      direction: "clockwise",
    } satisfies AccumulatedDistance);
  });

  type Params = {
    accDistance: AccumulatedDistance;
    expected: AccumulatedDistance;
  };
  it.each<Params>`
    accDistance                                 | expected
    ${{ distance: 10, direction: "clockwise" }} | ${{ distance: 5, direction: "clockwise" }}
    ${{ distance: 3, direction: "clockwise" }}  | ${{ distance: 2, direction: "counter-clockwise" }}
  `("should return correct totalDistance (different direction)", ({ accDistance, expected }) => {
    const from: Point = { x: 0, y: 0 };
    const to: Point = { x: 3, y: 4 };
    const direction: Direction = "counter-clockwise";

    const totalDistance = getTotalDistance(from, to, direction, accDistance);
    expect(totalDistance).toEqual(expected);
  });
});
