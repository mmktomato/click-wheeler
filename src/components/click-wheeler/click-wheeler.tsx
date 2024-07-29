import {
  Component,
  Event,
  EventEmitter,
  h,
 } from '@stencil/core';

import {
  hitTest,
  getDirection,
  getDistance,
  type Point,
  type Direction,
} from "../../utils/utils";

// TODO: This value should be passed as a prop.
// TODO: Set this value to CSS.
const circleSize = 200;

interface RotateEventDetail {
  direction: Direction;
  velocity: number;
  pressure: number;
}

@Component({
  tag: 'click-wheeler',
  styleUrl: 'click-wheeler.css',
  shadow: true,
})
export class ClickWheeler {
  private prevPoint: Point | undefined = undefined;

  @Event({
    eventName: 'rotate',
    bubbles: true,
    cancelable: true,
    composed: true,
  })
  private rotateEvent: EventEmitter<RotateEventDetail> | undefined;

  private onInnerClick = () => {
    // TODO: fix this: Emit event
    alert("Inner div clicked");
  }

  private onInnerPointerMove = (e: PointerEvent) => {
    e.stopPropagation();
  }

  // TODO: debounce
  private onOuterPointerMove = (e: PointerEvent) => {
    try {
      if (!this.prevPoint) {
        return;
      }
      if (!e.currentTarget || !(e.currentTarget instanceof HTMLElement)) {
        return null;
      }

      const area = hitTest(
        { x: e.clientX, y: e.clientY },
        e.currentTarget.getBoundingClientRect(),
        circleSize,
      );
      if (!area) {
        return;
      }

      const p: Point = { x: e.x, y: e.y };
      const dir = getDirection(area, this.prevPoint, p);
      if (!dir) {
        return;
      }

      const velocity = Math.round(getDistance(this.prevPoint, p));
      const pressure = Math.round(e.pressure * 10) / 10;
      this.rotateEvent?.emit({ direction: dir, velocity, pressure });
    } finally {
      this.prevPoint = { x: e.x, y: e.y };
    }
  }

  render() {
    return (
      <div class="container">
        <div class="outer"
          onPointerMove={this.onOuterPointerMove}
        >
          <div class="inner"
            onClick={this.onInnerClick}
            onPointerMove={this.onInnerPointerMove}
          />
        </div>
      </div>
    )
  }
}