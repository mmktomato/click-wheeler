import { LitElement, PropertyValues, css, html } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { customElement, property } from "lit/decorators.js";

import forwardIcon from "../assets/forward.svg?raw";
import menuIcon from "../assets/menu.svg?raw";
import playPauseIcon from "../assets/play-pause.svg?raw";

import {
  type IconTapArea,
  dispatchRotateEvent,
  handlePointerDownForTap,
  handlePointerUpForTap,
  handlePointerLeaveForTap,
} from "./events";
import {
  hitTest,
  getDirection,
  getTotalDistance,
  type Area,
  type Point,
  type AccumulatedDistance,
} from "../utils";

@customElement("click-wheeler")
export class ClickWheeler extends LitElement {
  @property({ type: Number })
  size: number = 200;

  private prevPoint?: Point;
  private accDistance?: AccumulatedDistance;
  private longTapTimer?: number;
  private pointerDownTarget?: "inner" | "icon";

  constructor() {
    super();
    this.addEventListener("touchmove", this.disablePullToRefresh);
  }

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);

    this.renderRoot
      .querySelector<HTMLDivElement>("div.container")
      ?.style.setProperty("--circle-size", `${this.size}px`);
  }

  private disablePullToRefresh = (e: Event) => {
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

  private releaseTargetPointerCapture = (e: PointerEvent) => {
    // https://stackoverflow.com/a/70737325/1115662
    if (e.target && e.target instanceof Element) {
      const hasPointerCapture = e.target.hasPointerCapture(e.pointerId);
      if (hasPointerCapture) {
        e.target.releasePointerCapture(e.pointerId);
      }
    }
  };

  private onOuterPointerDown = (e: PointerEvent) => {
    this.releaseTargetPointerCapture(e);
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
      const direction = getDirection(area, this.prevPoint, p);
      if (!direction) {
        return;
      }

      if (!this.accDistance) {
        this.accDistance = { distance: 0, direction };
      }

      const totalDistance = getTotalDistance(this.prevPoint, p, direction, this.accDistance);
      if (totalDistance.distance < 15) {
        this.accDistance = totalDistance;
        return;
      }
      this.accDistance = undefined;

      const velocity = Math.round(totalDistance.distance * 10) / 10;
      // const pressure = Math.round(e.pressure * 10) / 10;
      dispatchRotateEvent(this, { direction, velocity });
    } finally {
      this.prevPoint = { x: e.x, y: e.y };
    }
  };

  private onOuterPointerLeave = () => {
    this.prevPoint = undefined;
    this.accDistance = undefined;
  };

  private onInnerPointerDown = (e: PointerEvent) => {
    e.stopPropagation();
    this.pointerDownTarget = "inner";
    this.releaseTargetPointerCapture(e);
    this.longTapTimer = handlePointerDownForTap(this, "center", () => {
      this.longTapTimer = undefined;
    });
  };

  private onInnerPointerUp = (e: PointerEvent) => {
    e.stopPropagation();
    if (this.pointerDownTarget === "inner") {
      handlePointerUpForTap(this, this.longTapTimer, "center");
    }
  };

  private onInnerPointerMove = (e: PointerEvent) => {
    e.stopPropagation();
  };

  private onInnerPointerLeave = (e: PointerEvent) => {
    e.stopPropagation();
    this.pointerDownTarget = undefined;
    handlePointerLeaveForTap(this.longTapTimer);
  };

  private onIconPointerDown = (e: PointerEvent, tapArea: IconTapArea) => {
    e.stopPropagation();
    this.pointerDownTarget = "icon";
    this.releaseTargetPointerCapture(e);
    this.longTapTimer = handlePointerDownForTap(this, tapArea, () => {
      this.longTapTimer = undefined;
    });
  };

  private onIconPointerUp = (e: PointerEvent, tapArea: IconTapArea) => {
    e.stopPropagation();
    if (this.pointerDownTarget === "icon") {
      handlePointerUpForTap(this, this.longTapTimer, tapArea);
    }
  };

  private onIconPointerMove = () => {
    // e.stopPropagation();
  };

  private onIconPointerLeave = (e: PointerEvent) => {
    e.stopPropagation();
    this.pointerDownTarget = undefined;
    handlePointerLeaveForTap(this.longTapTimer);
  };

  render() {
    return html`
      <div class="container">
        <div
          class="outer"
          @pointerdown="${this.onOuterPointerDown}"
          @pointermove="${this.onOuterPointerMove}"
          @pointerleave="${this.onOuterPointerLeave}"
        >
          <div
            class="inner"
            @pointerdown="${this.onInnerPointerDown}"
            @pointerup="${this.onInnerPointerUp}"
            @pointermove="${this.onInnerPointerMove}"
            @pointerleave="${this.onInnerPointerLeave}"
          ></div>
          <div
            class="icon playPauseIcon"
            @pointerdown="${(e: PointerEvent) => this.onIconPointerDown(e, "playPause")}"
            @pointerup="${(e: PointerEvent) => this.onIconPointerUp(e, "playPause")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${unsafeSVG(playPauseIcon)}
          </div>
          <div
            class="icon menuIcon"
            @pointerdown="${(e: PointerEvent) => this.onIconPointerDown(e, "menu")}"
            @pointerup="${(e: PointerEvent) => this.onIconPointerUp(e, "menu")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${unsafeSVG(menuIcon)}
          </div>
          <div
            class="icon backwardIcon"
            @pointerdown="${(e: PointerEvent) => this.onIconPointerDown(e, "backward")}"
            @pointerup="${(e: PointerEvent) => this.onIconPointerUp(e, "backward")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${unsafeSVG(forwardIcon)}
          </div>
          <div
            class="icon forwardIcon"
            @pointerdown="${(e: PointerEvent) => this.onIconPointerDown(e, "forward")}"
            @pointerup="${(e: PointerEvent) => this.onIconPointerUp(e, "forward")}"
            @pointermove="${this.onIconPointerMove}"
            @pointerleave="${this.onIconPointerLeave}"
          >
            ${unsafeSVG(forwardIcon)}
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    .container {
      width: var(--circle-size);
      height: var(--circle-size);
    }

    .outer {
      display: flex;
      position: relative;
      width: 100%;
      height: 100%;
      background: #f1f1f1;
      border-radius: 50%;
    }

    .inner {
      width: 40%;
      height: 40%;
      margin: auto;
      background: white;
      border-radius: 50%;
    }

    .icon {
      display: flex;
      position: absolute;
      padding: 8px;
      color: #ccc;
      user-select: none;
    }

    .playPauseIcon {
      top: calc(85% - 8px);
      left: calc(50% - 20px);
    }

    .menuIcon {
      top: calc(15% - 24px);
      left: calc(50% - 29px);
    }

    .backwardIcon {
      top: calc(50% - 18px);
      left: calc(15% - 28px);
      transform: rotate(180deg);
    }

    .forwardIcon {
      top: calc(50% - 18px);
      left: calc(85% - 8px);
    }
  `;
}
