export type Area = "top" | "left" | "bottom" | "right";

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const hitTest = (point: Point, boundingClientRect: Rect, circleSize: number): Area | null => {
  const hitPointX = point.x - boundingClientRect.x;
  const hitPointY = point.y - boundingClientRect.y;

  // line1: y = x
  // line2: y = -x + diameter
  // NOTE: Y-axis is inverted. (= Down is positive.)
  const diameter = circleSize;
  const largerThanLine1 = hitPointY > hitPointX;
  const largerThanLine2 = hitPointY > hitPointX * -1 + diameter;

  if (largerThanLine1 && largerThanLine2) return "bottom";
  if (largerThanLine1 && !largerThanLine2) return "left";
  if (!largerThanLine1 && !largerThanLine2) return "top";
  if (!largerThanLine1 && largerThanLine2) return "right";
  return null;
};

export interface Point {
  x: number;
  y: number;
}
export type Direction = "clockwise" | "counter-clockwise";

export const getDirection = (area: Area, from: Point, to: Point): Direction | null => {
  const deltaX = to.x - from.x;
  const deltaY = to.y - from.y;
  switch (area) {
    case "top":
    case "bottom":
      if (0 === deltaX) {
        return null;
      }
      break;

    case "left":
    case "right":
      if (0 === deltaY) {
        return null;
      }
      break;

    default:
      return null;
  }

  switch (area) {
    case "top":
      return 0 < deltaX ? "clockwise" : "counter-clockwise";
    case "bottom":
      return 0 < deltaX ? "counter-clockwise" : "clockwise";
    case "right":
      return 0 < deltaY ? "clockwise" : "counter-clockwise";
    case "left":
      return 0 < deltaY ? "counter-clockwise" : "clockwise";
  }
};

export const getDistance = (from: Point, to: Point): number => {
  return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2);
};
