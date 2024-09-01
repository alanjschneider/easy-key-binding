# Easy Key Binding

Easy Key Binding is a simple tool that helps bind keyboard keys easily.

## Usage

If you want to execute a function only when `Ctrl+Shift+P` is pressed, you can do it this way:

```js
const ekb = new EKB();

const openMenu = () => console.log("Open menu");
ekb.bind("Ctrl+Shift+P", openMenu);
```

EKB listens to `window` by default. If you need to listen to events from a particular element, you need to pass it to the constructor:

```js
const input = document.getElementById("input");
const ekb = new EKB(input);

// Clears the input when Esc or Ctrl+Del is pressed
const clearInput = (e) => (e.target.value = "");
ekb.bind("Esc", clearInput);
ekb.bind("Ctrl+Del", clearInput);
```

To unbind a listener:

```js
const ekb = new EKB();
const listener = () => console.log("Pressed A");

ekb.bind("A", listener);
ekb.unbind("A", listener);
```

To unbind all listeners:

```js
const ekb = new EKB();
const listener = () => console.log("Pressed A");
const listener2 = () => console.log("Pressed A 2");

ekb.bind("A", listener);
ekb.bind("A", listener2);

ekb.unbindAll("A");
```

## Key maps

Some keys are mapped to be simpler:

```js
'ArrowLeft' => 'Left'
'ArrowUp' => 'Up'
'ArrowDown' => 'Down'
'ArrowBottom' => 'Bottom'
'Escape' => 'Esc'
'Delete' => 'Del',
'Meta (Windows key)' => 'Cmd',
'Capslock' => 'Caps',
'Insert' => 'Ins',
'Backspace' => 'Back',
' ' => 'Space',
```

Example:

```js
const ekb = new EKB();
const listener = () => console.log("Pressed");

ekb.bind("Left", listener);
ekb.bind("Up", listener);
ekb.bind("Down", listener);
ekb.bind("Bottom", listener);
ekb.bind("Esc", listener);
ekb.bind("Del", listener);
ekb.bind("Cmd", listener);
ekb.bind("Caps", listener);
ekb.bind("Ins", listener);
ekb.bind("Back", listener);
ekb.bind("Space", listener);
```
