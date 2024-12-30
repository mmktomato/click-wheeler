import { type HTMLClickWheelerElement } from "../src/types";

const clickWheeler = document.querySelector<HTMLClickWheelerElement>("click-wheeler");

(() => {
  const report = document.getElementById("report");

  clickWheeler?.addEventListener("rotate", e => {
    if (!report) {
      return;
    }

    const { direction, velocity } = e.detail;
    report.textContent = `direction = ${direction}\nvelocity = ${velocity}`;
  });

  clickWheeler?.addEventListener("tap", e => {
    if (!report) {
      return;
    }

    const { type, tapArea } = e.detail;
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
    switch (e.detail.direction) {
      case "clockwise":
        select("down");
        break;
      case "counter-clockwise":
        select("up");
        break;
    }
  });
})();

(() => {
  const requireShiftToRotateCheckbox =
    document.querySelector<HTMLInputElement>("#requireShiftToRotate");

  if (clickWheeler) {
    clickWheeler.requireShiftToRotate = requireShiftToRotateCheckbox?.checked;
  }

  requireShiftToRotateCheckbox?.addEventListener("change", e => {
    if (e.currentTarget && e.currentTarget instanceof HTMLInputElement) {
      if (clickWheeler) {
        clickWheeler.requireShiftToRotate = e.currentTarget.checked;
      }
    }
  });
})();
