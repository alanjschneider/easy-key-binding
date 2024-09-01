import { EKB } from '../src/index.js';

const input = document.getElementById('input');
const ekb = new EKB(input);

// Clears the input when Esc or Ctrl+Del is pressed
const clearInput = (e) => (e.target.value = '');
ekb.bind('Esc', clearInput);
ekb.bind('Ctrl+Del', clearInput);
