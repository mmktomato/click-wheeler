import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Prop,
 } from '@stencil/core';

import {
  type RotateEventDetail,
  type TapEventDetail,
  handlePointerUpForTap,
  handlePointerDownForTap,
  handlePointerMoveForTap,
  handlePointerLeaveForTap,
  type IconTapArea
} from "./events";
import {
  hitTest,
  getDirection,
  getDistance,
  type Area,
  type Point,
} from "../../utils/utils";
import PlayPauseIcon from "../../assets/play-pause.svg";
import MenuIcon from "../../assets/menu.svg";
import ForwardIcon from "../../assets/forward.svg";

@Component({
  tag: 'click-wheeler',
  styleUrl: 'click-wheeler.css',
  shadow: true,
})
export class ClickWheeler {
  private prevPoint: Point | undefined = undefined;
  private longTapTimer: number | undefined = undefined;
  private pointerDownTarget: "inner" | "icon" | undefined = undefined;
  @Prop() size: number = 200;
  @Element() hostElement?: HTMLElement;

  @Event({
    eventName: 'rotate',
    bubbles: true,
    cancelable: true,
    composed: true,
  })
  private rotateEvent: EventEmitter<RotateEventDetail> | undefined;

  @Event({
    eventName: 'tap',
    bubbles: true,
    cancelable: true,
    composed: true,
  })
  private tapEvent: EventEmitter<TapEventDetail> | undefined;

  connectedCallback() {
    this.hostElement?.style.setProperty("--circle-size", `${this.size}px`);
  }

  private getArea = (e: PointerEvent): Area | null => {
    if (!e.currentTarget || !(e.currentTarget instanceof HTMLElement)) {
      return null;
    }
    return hitTest(
      { x: e.clientX, y: e.clientY },
      e.currentTarget.getBoundingClientRect(),
      this.size,
    );
  }

  // TODO: debounce
  private onOuterPointerMove = (e: PointerEvent) => {
    try {
      if (!this.prevPoint) {
        return;
      }

      const area = this.getArea(e);
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

  private onInnerPointerDown = (e: PointerEvent) => {
    this.pointerDownTarget = "inner";
    this.longTapTimer = handlePointerDownForTap(e, this.tapEvent, "center", () => {
      this.longTapTimer = undefined;
    });
  }

  private onInnerPointerUp = (e: PointerEvent) => {
    if (this.pointerDownTarget === "inner") {
      handlePointerUpForTap(e, this.tapEvent, this.longTapTimer, "center");
    }
  }

  private onInnerPointerMove = (e: PointerEvent) => {
    handlePointerMoveForTap(e, this.longTapTimer);
  }

  private onInnerPointerLeave = (e: PointerEvent) => {
    this.pointerDownTarget = undefined;
    handlePointerLeaveForTap(e);
  }

  private onIconPointerDown = (e: PointerEvent, tapArea: IconTapArea) => {
    this.pointerDownTarget = "icon";
    this.longTapTimer = handlePointerDownForTap(e, this.tapEvent, tapArea, () => {
      this.longTapTimer = undefined;
    });
  }

  private onIconPointerUp = (e: PointerEvent, tapArea: IconTapArea) => {
    if (this.pointerDownTarget === "icon") {
      handlePointerUpForTap(e, this.tapEvent, this.longTapTimer, tapArea);
    }
  }

  private onIconPointerMove = (e: PointerEvent) => {
    handlePointerMoveForTap(e, this.longTapTimer);
  }

  private onIconPointerLeave = (e: PointerEvent) => {
    this.pointerDownTarget = undefined;
    handlePointerLeaveForTap(e);
  }

  render() {
    return (
      <div class="container">
        <div
          class="outer"
          onPointerMove={this.onOuterPointerMove}
        >
          <div
            class="inner"
            onPointerDown={this.onInnerPointerDown}
            onPointerUp={this.onInnerPointerUp}
            onPointerMove={this.onInnerPointerMove}
            onPointerLeave={this.onInnerPointerLeave}
          />
          <div
            class="icon playPauseIcon"
            innerHTML={PlayPauseIcon}
            onPointerDown={(e) => this.onIconPointerDown(e, "playPause")}
            onPointerUp={(e) => this.onIconPointerUp(e, "playPause")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
          <div
            class="icon menuIcon"
            innerHTML={MenuIcon}
            onPointerDown={(e) => this.onIconPointerDown(e, "menu")}
            onPointerUp={(e) => this.onIconPointerUp(e, "menu")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
          <div
            class="icon backwardIcon"
            innerHTML={ForwardIcon}
            onPointerDown={(e) => this.onIconPointerDown(e, "backward")}
            onPointerUp={(e) => this.onIconPointerUp(e, "backward")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
          <div
            class="icon forwardIcon"
            innerHTML={ForwardIcon}
            onPointerDown={(e) => this.onIconPointerDown(e, "forward")}
            onPointerUp={(e) => this.onIconPointerUp(e, "forward")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
        </div>
      </div>
    )
  }
}