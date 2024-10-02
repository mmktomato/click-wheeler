import {
  type ClickWheelerRotateEvent,
  type ClickWheelerTapEvent,
} from "../src/click-wheeler/events";

const clickWheeler = document.querySelector("click-wheeler");

(() => {
  const report = document.getElementById("report");

  clickWheeler?.addEventListener("rotate", e => {
    if (!report) {
      return;
    }

    const { detail } = e as ClickWheelerRotateEvent;
    const { direction, velocity } = detail;
    report.textContent = `direction = ${direction}\nvelocity = ${velocity}`;
  });

  clickWheeler?.addEventListener("tap", e => {
    if (!report) {
      return;
    }

    const { detail } = e as ClickWheelerTapEvent;
    const { type, tapArea } = detail;
    report.textContent = `type = ${type}\ntapArea = ${tapArea}`;
  });
})();

(() => {
  const listItems = document.querySelectorAll<HTMLLIElement>("#list > li");
  if (!listItems) {
    return;
  }

  const firstItem = listItems.item(0);
  if (firstItem) {
    firstItem.dataset.selected = "true";
  }

  const select = (direction: "up" | "down") => {
    const selectedIndex = Array.from(listItems).findIndex(listItem => listItem.dataset.selected);
    let newSelectedIndex = selectedIndex + (direction === "up" ? -1 : 1);
    newSelectedIndex = Math.min(listItems.length - 1, Math.max(0, newSelectedIndex));

    if (selectedIndex != newSelectedIndex) {
      listItems[selectedIndex].removeAttribute("data-selected");
      listItems[newSelectedIndex].dataset.selected = "true";
      listItems[newSelectedIndex].scrollIntoView({ block: "center" });
    }
  };

  clickWheeler?.addEventListener("rotate", e => {
    const direction = (e as ClickWheelerRotateEvent).detail.direction;
    switch (direction) {
      case "clockwise":
        select("down");
        break;
      case "counter-clockwise":
        select("up");
        break;
    }
  });
})();
