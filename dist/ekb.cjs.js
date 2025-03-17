"use strict";var e,t,s,i,r,n,a=e=>{throw TypeError(e)},o=(e,t,s)=>t.has(e)||a("Cannot "+s),l=(e,t,s)=>(o(e,t,"read from private field"),s?s.call(e):t.get(e)),c=(e,t,s)=>t.has(e)?a("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),d=(e,t,s)=>(o(e,t,"access private method"),s);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const h=class{
/**!
   * @param {HTMLElement} [domElement=window] - The DOM element to bind the keydown event to.
   */
constructor(e=window){var r,n,a,h;c(this,s),c(this,t),a=e,o(r=this,n=t,"write to private field"),h?h.call(r,a):n.set(r,a),l(this,t).addEventListener("keydown",d(this,s,i).bind(this)),this.binds={}}
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
   */unbind(e,t){const s=e.replace(/\s/g,"").toLowerCase();if(!(s in this.binds))return;const{listeners:i}=this.binds[s],r=[];for(const n of i)n!==t&&r.push(t);0===r.length?delete this.binds[s]:this.binds[s].listeners=r}
/**!
   * Removes all bindings associated with the specified key.
   *
   * @param {string} key - The key to unbind.
   */unbindAll(e){const t=e.replace(/\s/g,"").toLowerCase();t in this.binds&&delete this.binds[t]}};e=new WeakMap,t=new WeakMap,s=new WeakSet,
/**!
 * Handles the keydown event.
 *
 * @param {Event} event - The keydown event object.
 */
i=function(e){var t;for(const s in this.binds){const i=this.binds[s];if(!e.ctrlKey&&i.requireCtrl||e.ctrlKey&&!i.requireCtrl||!e.altKey&&i.requireAlt||e.altKey&&!i.requireAlt||!e.shiftKey&&i.requireShift||e.shiftKey&&!i.requireShift)continue;const a=e.key.toLowerCase();if("shift"!==a&&"alt"!==a&&i.splitedKeys.includes(d(t=h,r,n).call(t,a)))for(const t of i.listeners)t(e)}},r=new WeakSet,n=function(t){return l(this,e)[t]??t},c(h,r),c(h,e,{arrowleft:"left",arrowright:"right",arrowup:"up",arrowdown:"down",escape:"esc",delete:"del",meta:"cmd",capslock:"caps",insert:"ins",backspace:"back"," ":"space"});let u=h;exports.EKB=u;
