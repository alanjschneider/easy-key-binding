!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self).EKB={})}(this,(function(e){"use strict";var t,s,i,n,r,o,a=e=>{throw TypeError(e)},l=(e,t,s)=>t.has(e)||a("Cannot "+s),d=(e,t,s)=>(l(e,t,"read from private field"),s?s.call(e):t.get(e)),c=(e,t,s)=>t.has(e)?a("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),h=(e,t,s)=>(l(e,t,"access private method"),s);const f=class{
/**!
     * @param {HTMLElement} [domElement=window] - The DOM element to bind the keydown event to.
     */
constructor(e=window){var t,r,o,a;c(this,i),c(this,s),o=e,l(t=this,r=s,"write to private field"),a?a.call(t,o):r.set(t,o),d(this,s).addEventListener("keydown",h(this,i,n).bind(this)),this.binds={}}
/**!
     * Binds a key to a listener function.
     *
     * @param {string} key - The key to bind.
     * @param {function} listener - The listener function to be called when the key is pressed.
     * @returns {void}
     */bind(e,t){const s=e.replace(/\s/g,"").toLowerCase();s in this.binds?this.binds[s].listeners.push(t):this.binds[s]={listeners:[t],requireCtrl:s.includes("ctrl"),requireAlt:s.includes("alt"),requireShift:s.includes("shift"),splitedKeys:s.split("+")}}
/**!
     * Removes a listener from the key binding.
     *
     * @param {string} key - The key to unbind the listener from.
     * @param {Function} listener - The listener function to be removed.
     */unbind(e,t){const s=e.replace(/\s/g,"").toLowerCase();if(!(s in this.binds))return;const{listeners:i}=this.binds[s],n=[];for(const r of i)r!==t&&n.push(t);0===n.length?delete this.binds[s]:this.binds[s].listeners=n}
/**!
     * Removes all bindings associated with the specified key.
     *
     * @param {string} key - The key to unbind.
     */unbindAll(e){const t=e.replace(/\s/g,"").toLowerCase();t in this.binds&&delete this.binds[t]}};t=new WeakMap,s=new WeakMap,i=new WeakSet,
/**!
   * Handles the keydown event.
   *
   * @param {Event} event - The keydown event object.
   */
n=function(e){var t;for(const s in this.binds){const i=this.binds[s];if(!e.ctrlKey&&i.requireCtrl||e.ctrlKey&&!i.requireCtrl||!e.altKey&&i.requireAlt||e.altKey&&!i.requireAlt||!e.shiftKey&&i.requireShift||e.shiftKey&&!i.requireShift)continue;const n=e.key.toLowerCase();if("shift"!==n&&"alt"!==n&&i.splitedKeys.includes(h(t=f,r,o).call(t,n)))for(const t of i.listeners)t(e)}},r=new WeakSet,o=function(e){return d(this,t)[e]??e},c(f,r),c(f,t,{arrowleft:"left",arrowright:"right",arrowup:"up",arrowdown:"down",escape:"esc",delete:"del",meta:"cmd",capslock:"caps",insert:"ins",backspace:"back"," ":"space"});let u=f;e.EKB=u,Object.defineProperty(e,Symbol.toStringTag,{value:"Module"})}));
