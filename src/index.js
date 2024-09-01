export class EKB {
  static #MAPS = {
    arrowleft: 'left',
    arrowright: 'right',
    arrowup: 'up',
    arrowdown: 'down',
    escape: 'esc',
    delete: 'del',
    meta: 'cmd',
    capslock: 'caps',
    insert: 'ins',
    backspace: 'back',
    ' ': 'space',
  };

  // Private properties
  #domElement;
  #binds;

  /**
   * @param {HTMLElement} [domElement=window] - The DOM element to bind the keydown event to.
   */
  constructor(domElement = window) {
    this.#domElement = domElement;
    this.#domElement.addEventListener('keydown', this.#keyDown.bind(this));
    this.#binds = {};
  }

  /**
   * Binds a key to a listener function.
   *
   * @param {string} key - The key to bind.
   * @param {function} listener - The listener function to be called when the key is pressed.
   * @returns {void}
   */
  bind(key, listener) {
    const cleanKey = key.replace(/\s/g, '').toLowerCase();

    if (cleanKey in this.#binds) {
      this.#binds[cleanKey].listeners.push(listener);
      return;
    }

    this.#binds[cleanKey] = {
      listeners: [listener],
      requireCtrl: cleanKey.includes('ctrl'),
      requireAlt: cleanKey.includes('alt'),
      requireShift: cleanKey.includes('shift'),
      splitedKeys: cleanKey.split('+'),
    };
  }

  /**
   * Removes a listener from the key binding.
   *
   * @param {string} key - The key to unbind the listener from.
   * @param {Function} listener - The listener function to be removed.
   */
  unbind(key, listener) {
    const cleanKey = key.replace(/\s/g, '').toLowerCase();

    if (!(cleanKey in this.#binds)) return;

    const { listeners } = this.#binds[cleanKey];
    const filteredListeners = [];

    for (const _listener of listeners) {
      if (_listener !== listener) {
        filteredListeners.push(listener);
      }
    }

    if (filteredListeners.length === 0) {
      delete this.#binds[cleanKey];
    } else {
      this.#binds[cleanKey].listeners = filteredListeners;
    }
  }

  /**
   * Removes all bindings associated with the specified key.
   *
   * @param {string} key - The key to unbind.
   */
  unbindAll(key) {
    const cleanKey = key.replace(/\s/g, '').toLowerCase();

    if (!(cleanKey in this.#binds)) return;

    delete this.#binds[cleanKey];
  }

  /**
   * Handles the keydown event.
   *
   * @param {Event} event - The keydown event object.
   */
  #keyDown(event) {
    for (const bindKey in this.#binds) {
      const bind = this.#binds[bindKey];

      if (
        (!event.ctrlKey && bind.requireCtrl) ||
        (event.ctrlKey && !bind.requireCtrl) ||
        (!event.altKey && bind.requireAlt) ||
        (event.altKey && !bind.requireAlt) ||
        (!event.shiftKey && bind.requireShift) ||
        (event.shiftKey && !bind.requireShift)
      )
        continue;

      const pressedKey = event.key.toLowerCase();
      if (pressedKey === 'shift' || pressedKey === 'alt') continue;

      if (!bind.splitedKeys.includes(EKB.#map(pressedKey))) continue;

      for (const listener of bind.listeners) {
        listener(event);
      }
    }
  }

  /**
   * Maps a key to its corresponding value.
   *
   * @param {string} key - The key to be mapped.
   * @returns {string} - The corresponding value of the key, or the key itself if no mapping is found.
   */
  static #map(key) {
    return this.#MAPS[key] ?? key;
  }
}
