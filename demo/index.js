const clickWheeler = document.querySelector("click-wheeler");

(() => {
  const report = document.getElementById("report");

  clickWheeler.addEventListener("rotate", e => {
    const { detail } = e;
    const { direction, velocity } = detail;
    report.textContent = `direction = ${direction}\nvelocity = ${velocity}`;
  });

  clickWheeler.addEventListener("tap", e => {
    const { detail } = e;
    const { type, tapArea } = detail;
    report.textContent = `type = ${type}\ntapArea = ${tapArea}`;
  });
})();

(() => {
  const list = document.getElementById("list");
  const listItems = list.querySelectorAll("li");
  listItems[0].dataset.selected = true;

  const select = direction => {
    const selectedIndex = Array.from(listItems).findIndex(listItem => listItem.dataset.selected);
    let newSelectedIndex = selectedIndex + (direction === "up" ? -1 : 1);
    newSelectedIndex = Math.min(listItems.length - 1, Math.max(0, newSelectedIndex));

    if (selectedIndex != newSelectedIndex) {
      listItems[selectedIndex].removeAttribute("data-selected");
      listItems[newSelectedIndex].dataset.selected = true;
      listItems[newSelectedIndex].scrollIntoView({ block: "center" });
    }
  };

  clickWheeler.addEventListener("rotate", e => {
    const direction = e.detail.direction;
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
