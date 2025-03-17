var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _MAPS, _domElement, _EKB_instances, keyDown_fn, _EKB_static, map_fn;
const _EKB = class _EKB {
  /**!
   * @param {HTMLElement} [domElement=window] - The DOM element to bind the keydown event to.
   */
  constructor(domElement = window) {
    __privateAdd(this, _EKB_instances);
    // Private properties
    __privateAdd(this, _domElement);
    __privateSet(this, _domElement, domElement);
    __privateGet(this, _domElement).addEventListener("keydown", __privateMethod(this, _EKB_instances, keyDown_fn).bind(this));
    this.binds = {};
  }
  /**!
   * Binds a key to a listener function.
   *
   * @param {string} key - The key to bind.
   * @param {function} listener - The listener function to be called when the key is pressed.
   * @returns {void}
   */
  bind(key, listener) {
    const cleanKey = key.replace(/\s/g, "").toLowerCase();
    if (cleanKey in this.binds) {
      this.binds[cleanKey].listeners.push(listener);
      return;
    }
    this.binds[cleanKey] = {
      listeners: [listener],
      requireCtrl: cleanKey.includes("ctrl"),
      requireAlt: cleanKey.includes("alt"),
      requireShift: cleanKey.includes("shift"),
      splitedKeys: cleanKey.split("+")
    };
  }
  /**!
   * Removes a listener from the key binding.
   *
   * @param {string} key - The key to unbind the listener from.
   * @param {Function} listener - The listener function to be removed.
   */
  unbind(key, listener) {
    const cleanKey = key.replace(/\s/g, "").toLowerCase();
    if (!(cleanKey in this.binds)) return;
    const { listeners } = this.binds[cleanKey];
    const filteredListeners = [];
    for (const _listener of listeners) {
      if (_listener !== listener) {
        filteredListeners.push(listener);
      }
    }
    if (filteredListeners.length === 0) {
      delete this.binds[cleanKey];
    } else {
      this.binds[cleanKey].listeners = filteredListeners;
    }
  }
  /**!
   * Removes all bindings associated with the specified key.
   *
   * @param {string} key - The key to unbind.
   */
  unbindAll(key) {
    const cleanKey = key.replace(/\s/g, "").toLowerCase();
    if (!(cleanKey in this.binds)) return;
    delete this.binds[cleanKey];
  }
};
_MAPS = new WeakMap();
_domElement = new WeakMap();
_EKB_instances = new WeakSet();
/**!
 * Handles the keydown event.
 *
 * @param {Event} event - The keydown event object.
 */
keyDown_fn = function(event) {
  var _a;
  for (const bindKey in this.binds) {
    const bind = this.binds[bindKey];
    if (!event.ctrlKey && bind.requireCtrl || event.ctrlKey && !bind.requireCtrl || !event.altKey && bind.requireAlt || event.altKey && !bind.requireAlt || !event.shiftKey && bind.requireShift || event.shiftKey && !bind.requireShift)
      continue;
    const pressedKey = event.key.toLowerCase();
    if (pressedKey === "shift" || pressedKey === "alt") continue;
    if (!bind.splitedKeys.includes(__privateMethod(_a = _EKB, _EKB_static, map_fn).call(_a, pressedKey))) continue;
    for (const listener of bind.listeners) {
      listener(event);
    }
  }
};
_EKB_static = new WeakSet();
map_fn = function(key) {
  return __privateGet(this, _MAPS)[key] ?? key;
};
__privateAdd(_EKB, _EKB_static);
__privateAdd(_EKB, _MAPS, {
  arrowleft: "left",
  arrowright: "right",
  arrowup: "up",
  arrowdown: "down",
  escape: "esc",
  delete: "del",
  meta: "cmd",
  capslock: "caps",
  insert: "ins",
  backspace: "back",
  " ": "space"
});
let EKB = _EKB;
export {
  EKB
};
