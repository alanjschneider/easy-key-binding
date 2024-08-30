class EKB {
  static MAPS = {
    arrowleft: 'left',
    arrowright: 'right',
    arrowup: 'up',
    arrowdown: 'down',
  };

  constructor(domElement = window) {
    this.domElement = domElement;
    this.domElement.addEventListener('keydown', this.keyDown.bind(this));
    this.binds = {};
    this.mode = 'keydown';
  }

  bind(key, listener) {
    const cleanKey = key.replace(/\s/g, '').toLowerCase();

    if (cleanKey in this.binds) {
      this.binds[cleanKey].listeners.push(listener);
      return;
    }

    this.binds[cleanKey] = {
      listeners: [listener],
      requireCtrl: cleanKey.includes('ctrl'),
      requireAlt: cleanKey.includes('alt'),
      requireShift: cleanKey.includes('shift'),
    };

    this.mode = 'keyup';
  }

  unbind(key, listener) {
    const cleanKey = key.replace(/\s/g, '').toLowerCase();

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

  unbindAll(key) {
    const cleanKey = key.replace(/\s/g, '').toLowerCase();

    if (!(cleanKey in this.binds)) return;

    delete this.binds[cleanKey];
  }

  pressing() {
    this.mode = 'pressing';
    return this;
  }

  keyDown(event) {
    for (const bindKey in this.binds) {
      const bind = this.binds[bindKey];

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

      if (!bindKey.includes(this.map(pressedKey))) continue;

      for (const listener of bind.listeners) {
        listener(event);
      }
    }
  }

  map(key) {
    return EKB.MAPS[key] ?? key;
  }
}
