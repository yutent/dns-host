/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2019-09-16 20:52:26
 * @version v2.0.1
 * 
 */

'use strict'

import"../icon/index.js";import{bind,unbind}from"../utils.js";export default class Checkbox extends HTMLElement{static get observedAttributes(){return["label","color","value","checked","readonly","disabled"]}constructor(){super(),Object.defineProperty(this,"root",{value:this.attachShadow({mode:"open"}),writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(this,"props",{value:{label:"",color:"",value:[],checked:!1,readonly:!1,disabled:!1},writable:!0,enumerable:!1,configurable:!0}),this.root.innerHTML="<style>*{box-sizing:border-box;margin:0;padding:0}::before,::after{box-sizing:border-box}:host{display:inline-block;line-height:1;font-size:14px}:host label{display:flex;justify-content:center;align-items:center;min-width:32px;height:32px;padding:0 5px;line-height:0;user-select:none;-moz-user-select:none;cursor:inherit;color:#7e909a}:host .dot{--size: 18px;padding:2px;margin-right:3px}:host([readonly]){opacity:0.8}:host([disabled]){cursor:not-allowed;opacity:0.6}:host([size='large']){font-size:16px}:host([size='large']) label{height:42px}:host([size='large']) .dot{--size: 22px}:host([size='medium']) label{height:38px}:host([size='medium']) .dot{--size: 20px}:host([size='mini']){font-size:12px}:host([size='mini']) label{height:20px}:host([size='mini']) .dot{--size: 14px}:host([color='red']) label.checked{color:#ff5061}:host([color='red']) label.checked .dot{border-color:#ff5061}:host([color='red']) label.checked .dot::after{background:#ff5061}:host([color='blue']) label.checked{color:#66b1ff}:host([color='blue']) label.checked .dot{border-color:#66b1ff}:host([color='blue']) label.checked .dot::after{background:#66b1ff}:host([color='green']) label.checked{color:#58d68d}:host([color='green']) label.checked .dot{border-color:#58d68d}:host([color='green']) label.checked .dot::after{background:#58d68d}:host([color='teal']) label.checked{color:#3fc2a7}:host([color='teal']) label.checked .dot{border-color:#3fc2a7}:host([color='teal']) label.checked .dot::after{background:#3fc2a7}:host([color='orange']) label.checked{color:#ffb618}:host([color='orange']) label.checked .dot{border-color:#ffb618}:host([color='orange']) label.checked .dot::after{background:#ffb618}:host([color='dark']) label.checked{color:#62778d}:host([color='dark']) label.checked .dot{border-color:#62778d}:host([color='dark']) label.checked .dot::after{background:#62778d}:host([color='purple']) label.checked{color:#ac61ce}:host([color='purple']) label.checked .dot{border-color:#ac61ce}:host([color='purple']) label.checked .dot::after{background:#ac61ce}\n</style> <label> <wc-icon class=\"dot\" is=\"checkbox-off\"></wc-icon> <slot></slot> </label> ",this.__SWITCH__=this.root.lastElementChild,this.__ICO__=this.__SWITCH__.children[0]}get value(){return this.props.value}set value(e){if(!Array.isArray(e))throw TypeError(":duplex指令需要传入一个数组, 当前为: "+typeof e);this.props.value=e,this.checked=this.props.value.includes(this.props.label)}get checked(){return this.props.checked}set checked(e){this.props.checked=!!e;var{value:o,checked:t,label:l,color:r}=this.props;this.__SWITCH__.classList.toggle("checked",t),this.__ICO__.setAttribute("is","checkbox-"+(t?"on":"off"));var c=o.indexOf(l);t?(this.__ICO__.setAttribute("color",r),c<0&&o.push(l)):(this.__ICO__.removeAttribute("color"),~c&&o.splice(c,1))}get readonly(){return this.props.readonly}set readonly(e){var o=typeof e;e!==this.props.readonly&&("boolean"===o&&e||"boolean"!==o?(this.props.readonly=!0,this.setAttribute("readonly","")):(this.props.readonly=!1,this.removeAttribute("readonly")))}get disabled(){return this.props.disabled}set disabled(e){var o=typeof e;e!==this.props.disabled&&("boolean"===o&&e||"boolean"!==o?(this.props.disabled=!0,this.setAttribute("disabled","")):(this.props.disabled=!1,this.removeAttribute("disabled")))}connectedCallback(){this._handlClick=bind(this,"click",e=>{e.preventDefault(),this.disabled||this.readonly||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("input")))})}disconnectedCallback(){unbind(this,"click",this._handlClick)}attributeChangedCallback(e,o,t){if(null!==t&&o!==t)switch(e){case"label":case"color":this.props[e]=t;break;case"checked":case"readonly":case"disabled":this[e]=!0}}};

if(!customElements.get('wc-checkbox')){
  customElements.define('wc-checkbox', Checkbox)
}
