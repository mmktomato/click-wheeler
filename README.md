# Click Wheeler

A web component that allows you to control scrolling and clicking with a rotar.

## Install

TBD

## Usage

```jsx
import "click-wheeler";

<click-wheeler></click-wheeler>
```

### React usage

```jsx
import "click-wheeler"
import { ClickWheelerComponent } from "click-wheeler/react"

<ClickWheelerComponent />
```

Note you have to install `react`.

## Attributes

| Name   | Default value | Description |
| :---   | :---          | :---        |
| `size` | `200`         | Diameter of the component |

## Events

### `rotate`

Emitted when the roter is rotating.

```typescript
import { type ClickWheelerRotateEvent } from "click-wheeler";

clickWheeler.addEventListener("rotate", (e: ClickWheelerRotateEvent) => {
  console.log(e.detail);
});

// If you're using React:
<ClickWheelerComponent
  onRotate={e => console.log(e.detail)}
/>
```

Two properties are available.

| Name                 | type                            | Description |
| :---                 | :---                            | :---        |
| `e.detail.direction` | `clockwise` `counter-clockwise` | Indicates which direction the roter is rotating. |
| `e.detail.velocity`  | `number`                        | Indicates how fast the roter is rotating. |

### `tap`

Emitted when some parts of the component are tapped.

```typescript
import { type ClickWheelerTapEvent } from "click-wheeler";

clickWheeler.addEventListener("tap", (e: ClickWheelerTapEvent) => {
  console.log(e.detail);
});

// If you're using React:
<ClickWheelerComponent
  onTap={e => console.log(e.detail)}
/>
```

Two properties are available.

| Name               | type                                             | Description |
| :---               | :---                                             | :---        |
| `e.detail.type`    | `tap` `long-tap`                                 | Indicates tap type. |
| `e.detail.tapArea` | `center` `forward` `backward` `menu` `playPause` | Indicates which area is tapped. |

## License

MIT
