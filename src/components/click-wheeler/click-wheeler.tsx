import { Component, Element as StencilElement, Event, EventEmitter, h, Prop } from "@stencil/core";

import {
  type RotateEventDetail,
  type TapEventDetail,
  handlePointerUpForTap,
  handlePointerDownForTap,
  handlePointerMoveForTap,
  type IconTapArea,
} from "./events";
import { hitTest, getDirection, getDistance, type Area, type Point } from "../../utils/utils";
import PlayPauseIcon from "../../assets/play-pause.svg";
import MenuIcon from "../../assets/menu.svg";
import ForwardIcon from "../../assets/forward.svg";

@Component({
  tag: "click-wheeler",
  styleUrl: "click-wheeler.css",
  shadow: true,
})
export class ClickWheeler {
  private prevPoint: Point | undefined = undefined;
  private longTapTimer: number | undefined = undefined;
  private pointerDownTarget: "inner" | "icon" | undefined = undefined;
  @Prop() size: number = 200;
  @StencilElement() hostElement?: HTMLElement;

  @Event({
    eventName: "rotate",
    bubbles: true,
    cancelable: true,
    composed: true,
  })
  private rotateEvent: EventEmitter<RotateEventDetail> | undefined;

  @Event({
    eventName: "tap",
    bubbles: true,
    cancelable: true,
    composed: true,
  })
  private tapEvent: EventEmitter<TapEventDetail> | undefined;

  connectedCallback() {
    this.hostElement?.style.setProperty("--circle-size", `${this.size}px`);

    this.hostElement?.removeEventListener("touchmove", this.disablePullToRefresh);
    this.hostElement?.addEventListener("touchmove", this.disablePullToRefresh, { passive: false });
  }

  private disablePullToRefresh = (e: TouchEvent) => {
    e.preventDefault();
  };

  private getArea = (e: PointerEvent): Area | null => {
    if (!e.currentTarget || !(e.currentTarget instanceof HTMLElement)) {
      return null;
    }
    const hitPoint: Point = { x: e.clientX, y: e.clientY };
    const boundingClientRect = e.currentTarget.getBoundingClientRect();
    return hitTest(hitPoint, boundingClientRect, this.size);
  };

  private releasePointerCapture = (e: PointerEvent) => {
    // https://stackoverflow.com/a/70737325/1115662
    if (e.target && e.target instanceof Element) {
      const hasPointerCapture = e.target.hasPointerCapture(e.pointerId);
      if (hasPointerCapture) {
        e.target.releasePointerCapture(e.pointerId);
      }
    }
  };

  private onOuterPointerDown = (e: PointerEvent) => {
    this.releasePointerCapture(e);
  };

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
      const velocity = Math.round(getDistance(this.prevPoint, p) * 10) / 10;
      if (velocity < 3.8) {
        return;
      }

      const dir = getDirection(area, this.prevPoint, p);
      if (!dir) {
        return;
      }

      // const pressure = Math.round(e.pressure * 10) / 10;
      this.rotateEvent?.emit({ direction: dir, velocity });
    } finally {
      this.prevPoint = { x: e.x, y: e.y };
    }
  };

  private onOuterPointerLeave = () => {
    this.prevPoint = undefined;
  };

  private onInnerPointerDown = (e: PointerEvent) => {
    e.stopPropagation();
    this.pointerDownTarget = "inner";
    this.releasePointerCapture(e);
    this.longTapTimer = handlePointerDownForTap(this.tapEvent, "center", () => {
      this.longTapTimer = undefined;
    });
  };

  private onInnerPointerUp = (e: PointerEvent) => {
    e.stopPropagation();
    if (this.pointerDownTarget === "inner") {
      handlePointerUpForTap(this.tapEvent, this.longTapTimer, "center");
    }
  };

  private onInnerPointerMove = (e: PointerEvent) => {
    e.stopPropagation();
    handlePointerMoveForTap(e, this.longTapTimer);
  };

  private onInnerPointerLeave = (e: PointerEvent) => {
    e.stopPropagation();
    this.pointerDownTarget = undefined;
  };

  private onIconPointerDown = (e: PointerEvent, tapArea: IconTapArea) => {
    e.stopPropagation();
    this.pointerDownTarget = "icon";
    this.releasePointerCapture(e);
    this.longTapTimer = handlePointerDownForTap(this.tapEvent, tapArea, () => {
      this.longTapTimer = undefined;
    });
  };

  private onIconPointerUp = (e: PointerEvent, tapArea: IconTapArea) => {
    e.stopPropagation();
    if (this.pointerDownTarget === "icon") {
      handlePointerUpForTap(this.tapEvent, this.longTapTimer, tapArea);
    }
  };

  private onIconPointerMove = (e: PointerEvent) => {
    // e.stopPropagation();
    handlePointerMoveForTap(e, this.longTapTimer);
  };

  private onIconPointerLeave = (e: PointerEvent) => {
    e.stopPropagation();
    this.pointerDownTarget = undefined;
  };

  render() {
    return (
      <div class="container">
        <div
          class="outer"
          onPointerDown={this.onOuterPointerDown}
          onPointerMove={this.onOuterPointerMove}
          onPointerLeave={this.onOuterPointerLeave}
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
            onPointerDown={e => this.onIconPointerDown(e, "playPause")}
            onPointerUp={e => this.onIconPointerUp(e, "playPause")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
          <div
            class="icon menuIcon"
            innerHTML={MenuIcon}
            onPointerDown={e => this.onIconPointerDown(e, "menu")}
            onPointerUp={e => this.onIconPointerUp(e, "menu")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
          <div
            class="icon backwardIcon"
            innerHTML={ForwardIcon}
            onPointerDown={e => this.onIconPointerDown(e, "backward")}
            onPointerUp={e => this.onIconPointerUp(e, "backward")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
          <div
            class="icon forwardIcon"
            innerHTML={ForwardIcon}
            onPointerDown={e => this.onIconPointerDown(e, "forward")}
            onPointerUp={e => this.onIconPointerUp(e, "forward")}
            onPointerMove={this.onIconPointerMove}
            onPointerLeave={this.onIconPointerLeave}
          />
        </div>
      </div>
    );
  }
}
