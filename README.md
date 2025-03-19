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

## Installation

### Using npm with a Bundler (Webpack, Vite, etc.)

1. Install the package via npm:

    ```bash
    npm install easy-key-binding
    ```

2. Import the module into your project:

    ```javascript
    // Using CommonJS
    const { EKB } = require("easy-key-binding");

    // Using ES Modules
    import { EKB } from "easy-key-binding";
    ```

---

### Using EKB in the Browser

#### Option 1: Include the UMD Build Directly

1. Download the `ekb.umd.js` file from the `dist` folder.
2. Include it in your HTML file using a `<script>` tag:

    ```html
    <script src="./ekb.umd.js"></script>
    <!-- Your script using EKB goes here -->
    ```

3. EKB will be available globally. To create a new instance, access the `EKB` class from the global `EKB` object:

    ```javascript
    const ekb = new EKB.EKB();
    ```

---

#### Option 2: Use ES Modules

1. Download the `ekb.es.js` file from the `dist` folder.
2. Import it in your JavaScript file:

    ```javascript
    import { EKB } from "./ekb.es.js";

    const ekb = new EKB();
    ```

---

#### Option 3: Use Import Maps (Modern Browsers)

1. Download the `ekb.es.js` file from the `dist` folder.
2. Define an import map in your HTML file:

    ```html
    <script type="importmap">
        {
            "imports": {
                "easy-key-binding": "./ekb.es.js"
            }
        }
    </script>
    <!-- Your script using EKB goes here -->
    ```

3. Import the module in your JavaScript file:

    ```javascript
    import { EKB } from "easy-key-binding";

    const ekb = new EKB();
    ```

## Key maps

Some keys are mapped to be simpler:

```js
'ArrowLeft' => 'Left'
'ArrowUp' => 'Up'
'ArrowDown' => 'Down'
'ArrowRight' => 'Right'
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
ekb.bind("Right", listener);
ekb.bind("Esc", listener);
ekb.bind("Del", listener);
ekb.bind("Cmd", listener);
ekb.bind("Caps", listener);
ekb.bind("Ins", listener);
ekb.bind("Back", listener);
ekb.bind("Space", listener);
```
