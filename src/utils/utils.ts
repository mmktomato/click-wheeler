type Area = "top" | "left" | "bottom" | "right";

// TODO: write unit tests
export const hitTest = (e: PointerEvent, circleSize: number): Area | null => {
  if (!e.currentTarget || !(e.currentTarget instanceof HTMLElement)) {
    return null;
  }

  const bcRect = e.currentTarget.getBoundingClientRect();
  const x = e.clientX - bcRect.left - (circleSize / 2);
  const y = e.clientY - bcRect.top - (circleSize / 2);
  
  // line1: -y = x
  // line2: -y = -x
  const isAboveLine1 = (y * -1) > x;
  const isAboveLine2 = (y * -1) > (x * -1);
  
  if (isAboveLine1 && isAboveLine2) return "top";
  if (isAboveLine1 && !isAboveLine2) return "left";
  if (!isAboveLine1 && !isAboveLine2) return "bottom";
  if (!isAboveLine1 && isAboveLine2) return "right";
  return null;
}

export type Point = { x: number, y: number };
export type Direction = "clockwise" | "counter-clockwise";

export const getDirection = (
  area: Area,
  from: Point,
  to: Point,
): Direction | null => {
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
      return (0 < deltaX) ? "clockwise" : "counter-clockwise";
    case "bottom":
      return (0 < deltaX) ? "counter-clockwise" : "clockwise";
    case "right":
      return (0 < deltaY) ? "clockwise" : "counter-clockwise";
    case "left":
      return (0 < deltaY) ? "counter-clockwise" : "clockwise";
  }
};

export const getDistance = (
  from: Point,
  to: Point,
): number => {
  return Math.sqrt(((to.x - from.x) ** 2) + ((to.y - from.y) ** 2));
};