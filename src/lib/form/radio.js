/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2019-09-27 11:36:21
 * @version v2.0.1
 * 
 */

'use strict'

import{bind,unbind}from"../utils.js";export default class Radio extends HTMLElement{static get observedAttributes(){return["label","checked","readonly","disabled"]}constructor(){super(),Object.defineProperty(this,"root",{value:this.attachShadow({mode:"open"}),writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(this,"props",{value:{label:"",checked:!1,readonly:!1,disabled:!1},writable:!0,enumerable:!1,configurable:!0}),this.root.innerHTML="<style>*{box-sizing:border-box;margin:0;padding:0}::before,::after{box-sizing:border-box}:host{display:inline-block;line-height:1;font-size:14px}:host label{display:flex;justify-content:center;align-items:center;min-width:32px;height:32px;padding:0 5px;line-height:0;-moz-user-select:none;user-select:none;white-space:nowrap;cursor:inherit;color:#7e909a}:host label.checked .dot::after{display:block;width:12px;height:12px;border-radius:50%;background:#aabac3;content:''}:host .dot{width:18px;height:18px;padding:2px;margin-right:3px;border:1px solid #aabac3;border-radius:50%;background:#fff}:host([readonly]){opacity:0.8}:host([disabled]){cursor:not-allowed;opacity:0.6}:host([size='large']) label{width:58px;height:32px}:host([size='large']) .dot{width:26px;height:26px}:host([size='medium']) label{width:50px;height:28px}:host([size='medium']) .dot{width:22px;height:22px}:host([size='mini']) label{width:22px;height:14px;padding:2px}:host([size='mini']) .dot{width:10px;height:10px}:host([color='red']) label.checked{color:#ff5061}:host([color='red']) label.checked .dot{border-color:#ff5061}:host([color='red']) label.checked .dot::after{background:#ff5061}:host([color='blue']) label.checked{color:#66b1ff}:host([color='blue']) label.checked .dot{border-color:#66b1ff}:host([color='blue']) label.checked .dot::after{background:#66b1ff}:host([color='green']) label.checked{color:#58d68d}:host([color='green']) label.checked .dot{border-color:#58d68d}:host([color='green']) label.checked .dot::after{background:#58d68d}:host([color='teal']) label.checked{color:#3fc2a7}:host([color='teal']) label.checked .dot{border-color:#3fc2a7}:host([color='teal']) label.checked .dot::after{background:#3fc2a7}:host([color='orange']) label.checked{color:#ffb618}:host([color='orange']) label.checked .dot{border-color:#ffb618}:host([color='orange']) label.checked .dot::after{background:#ffb618}:host([color='dark']) label.checked{color:#62778d}:host([color='dark']) label.checked .dot{border-color:#62778d}:host([color='dark']) label.checked .dot::after{background:#62778d}:host([color='purple']) label.checked{color:#ac61ce}:host([color='purple']) label.checked .dot{border-color:#ac61ce}:host([color='purple']) label.checked .dot::after{background:#ac61ce}\n</style> <label> <span class=\"dot\"></span> <slot></slot> </label> ",this.__SWITCH__=this.root.lastElementChild}get value(){return this.props.label}set value(e){this.checked=this.props.label===e}get checked(){return this.props.checked}set checked(e){this.props.checked=!!e,this.__SWITCH__.classList.toggle("checked",this.props.checked)}get readonly(){return this.props.readonly}set readonly(e){var o=typeof e;e!==this.props.readonly&&("boolean"===o&&e||"boolean"!==o?(this.props.readonly=!0,this.setAttribute("readonly","")):(this.props.readonly=!1,this.removeAttribute("readonly")))}get disabled(){return this.props.disabled}set disabled(e){var o=typeof e;e!==this.props.disabled&&("boolean"===o&&e||"boolean"!==o?(this.props.disabled=!0,this.setAttribute("disabled","")):(this.props.disabled=!1,this.removeAttribute("disabled")))}connectedCallback(){this._handleClick=bind(this,"click",e=>{this.disabled||this.readonly||this.checked||(this.checked=!0,this.dispatchEvent(new CustomEvent("input")))})}disconnectedCallback(){unbind(this,"click",this._handleClick)}attributeChangedCallback(e,o,t){if(null!==t&&o!==t)switch(e){case"label":this.props.label=t;break;case"checked":case"readonly":case"disabled":this[e]=!0}}};

if(!customElements.get('wc-radio')){
  customElements.define('wc-radio', Radio)
}
