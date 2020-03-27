/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2020-03-27 14:02:14
 * @version v2.0.1
 * 
 */

'use strict'

import $ from"../utils.js";export default class Star extends HTMLElement{static get observedAttributes(){return["value","text","size","color","allow-half","show-value","starSize","disabled"]}constructor(){super(),Object.defineProperty(this,"root",{value:this.attachShadow({mode:"open"}),writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(this,"props",{value:{value:0,text:[],size:"",color:"","allow-half":!1,"show-value":!1,starSize:32,disabled:!1},writable:!0,enumerable:!1,configurable:!0}),this.root.innerHTML='<style>*{box-sizing:border-box;margin:0;padding:0}::before,::after{box-sizing:border-box}:host{display:flex;-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;font-size:14px;--size: 24px}label{display:flex;align-items:center;line-height:0;cursor:inherit}label wc-icon{margin:0 3px;transition:transform .1s ease-in-out}label wc-icon:hover{transform:scale(1.05)}label span{padding:0 8px;margin:0 3px}:host([size=\'large\']){font-size:16px;--size: 36px}:host([size=\'medium\']){--size: 30px}:host([size=\'mini\']){font-size:12px;--size: 20px}:host([color=\'red\']) label span{color:#ff5061}:host([color=\'teal\']) label span{color:#3fc2a7}:host([color=\'green\']) label span{color:#58d68d}:host([color=\'grey\']) label span{color:#aabac3}:host([color=\'blue\']) label span{color:#66b1ff}:host([color=\'purple\']) label span{color:#ac61ce}:host([color=\'orange\']) label span{color:#ffb618}:host([disabled]){cursor:default;opacity:0.6}:host([disabled]) label wc-icon:hover{transform:none}</style> <label> <wc-icon data-idx="0" is="star" color="grey"></wc-icon> <wc-icon data-idx="1" is="star" color="grey"></wc-icon> <wc-icon data-idx="2" is="star" color="grey"></wc-icon> <wc-icon data-idx="3" is="star" color="grey"></wc-icon> <wc-icon data-idx="4" is="star" color="grey"></wc-icon> <span class="text"></span> </label> ',this.__BOX__=this.root.children[1],this.__STARS__=Array.from(this.__BOX__.children),this.__TEXT__=this.__STARS__.pop()}get value(){return this.props.value}set value(t){var e=+t;(t=e==e&&e>0?e:0)>5&&(t=5),this.props.value=t,this._updateDraw(-1)}_updateDraw(t,e=0){var s="star-half",{value:o,tmp:a={i:0,f:0}}=this.props;-1===t&&(t=Math.floor(o),e=+(o%1).toFixed(1),t>0&&t===o&&(t--,e=1)),this.props["allow-half"]||(e=e>0?1:0),t===a.i&&e===a.f||(e>.5&&(s="star-full"),this.__STARS__.forEach((e,s)=>{e.setAttribute("is",s<t?"star-full":"star"),e.setAttribute("color",s<t?this.props.color:"grey")}),e>0&&(this.__STARS__[t].setAttribute("is",s),this.__STARS__[t].setAttribute("color",this.props.color)),this.props.tmp={i:t,f:e},0===t&&0===e?this.__TEXT__.textContent="":5===this.props.text.length?this.__TEXT__.textContent=this.props.text[t]:this.props["show-value"]&&(this.__TEXT__.textContent=t+e))}connectedCallback(){$.catch(this.__BOX__,"mousemove",t=>{if(!this.props.disabled&&"WC-ICON"===t.target.tagName){let e=+t.target.dataset.idx;this._updateDraw(e,+(t.offsetX/this.props.starSize).toFixed(1))}}),$.catch(this.__BOX__,"click",t=>{var{tmp:e,disabled:s}=this.props;s||"WC-ICON"===t.target.tagName&&(this.props.value=e.i+e.f,this.dispatchEvent(new CustomEvent("input")))}),$.catch(this.__BOX__,"mouseleave",t=>{this.props.disabled||this._updateDraw(-1)})}attributeChangedCallback(t,e,s){if(null!==s&&e!==s)switch(t){case"size":this.props.starSize=this.__STARS__[0].clientWidth;break;case"allow-half":case"show-value":case"disabled":this.props[t]=!0;break;case"color":s&&(this.props.color=s);break;case"text":s&&5===(s=s.split("|")).length&&(this.props.text=s.map(t=>t.trim()));break;case"value":this.value=s}}};

if(!customElements.get('wc-star')){
  customElements.define('wc-star', Star)
}
