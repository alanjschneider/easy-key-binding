const { JSDOM } = require('jsdom');
const EKB = require('../src/index.js');

describe('EKB', () => {
  let ekb;
  let dom;

  beforeEach(() => {
    dom = new JSDOM();
    ekb = new EKB(dom.window);
  });

  test('bind should add a listener to the key', () => {
    const listener = jest.fn();
    ekb.bind('a', listener);
    expect(ekb.binds.a.listeners).toEqual([listener]);
  });

  test('unbind should remove a listener from the key', () => {
    const listener = jest.fn();
    ekb.bind('a', listener);
    ekb.unbind('a', listener);
    expect(ekb.binds.a).toBeUndefined();
  });

  test('unbindAll should remove all listeners from the key', () => {
    const listener = jest.fn();
    const listener2 = jest.fn();
    ekb.bind('a', listener);
    ekb.bind('a', listener2);
    ekb.unbindAll('a');
    expect(ekb.binds.a).toBeUndefined();
  });

  test('should call listener if key is pressed', () => {
    const listener = jest.fn();
    ekb.bind('Enter', listener);

    const event = new dom.window.KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      bubbles: true,
    });

    dom.window.document.dispatchEvent(event);

    expect(listener).toHaveBeenCalled();
  });

  test('should call listener if key is bound with ctrl', () => {
    const listener = jest.fn();
    ekb.bind('Ctrl+Enter', listener);

    const event = new dom.window.KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      ctrlKey: true,
      bubbles: true,
    });

    dom.window.document.dispatchEvent(event);

    expect(listener).toHaveBeenCalled();
  });

  test('should not call listener if key is bound with ctrl and ctrl is not pressed', () => {
    const listener = jest.fn();
    ekb.bind('Ctrl+Enter', listener);

    const event = new dom.window.KeyboardEvent('keydown', {
      key: 'Enter',
      code: 'Enter',
      keyCode: 13,
      ctrlKey: false,
      bubbles: true,
    });

    dom.window.document.dispatchEvent(event);

    expect(listener).not.toHaveBeenCalled();
  });
});
