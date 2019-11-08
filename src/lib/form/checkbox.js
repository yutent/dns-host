/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2019-09-16 10:23:25
 * @version v2.0.1
 * 
 */

'use strict'

const log = console.log


import "../icon/index.js"
import { bind, unbind } from "../utils.js"

export default class Checkbox extends HTMLElement  {
  static get observedAttributes() {
        return ["label","color","value","checked","readonly","disabled"]
      }
      
  constructor() {
 super();
    
      Object.defineProperty(this, 'root', {
        value: this.attachShadow({ mode: 'open' }),
        writable: true,
        enumerable: false,
        configurable: true
      })
      Object.defineProperty(this, 'props', {
        value: {
    label: '',
    color: '',
    value: [],
    checked: false,
    readonly: false,
    disabled: false
  },
        writable: true,
        enumerable: false,
        configurable: true
      })

      this.root.innerHTML = `<style>* {
  box-sizing: border-box;
  margin: 0;
  padding: 0; }

::before,
::after {
  box-sizing: border-box; }

:host {
  display: inline-block;
  line-height: 1;
  font-size: 14px; }
  :host label {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 32px;
    height: 32px;
    padding: 0 5px;
    line-height: 0;
    -moz-user-select: none;
    user-select: none;
    white-space: nowrap;
    cursor: inherit;
    color: #7e909a; }
  :host .dot {
    --size: 18px;
    padding: 2px;
    margin-right: 3px; }

:host([readonly]) {
  opacity: 0.8; }

:host([disabled]) {
  cursor: not-allowed;
  opacity: 0.6; }

:host([size='large']) {
  font-size: 16px; }
  :host([size='large']) label {
    height: 42px; }
  :host([size='large']) .dot {
    --size: 22px; }

:host([size='medium']) label {
  height: 38px; }

:host([size='medium']) .dot {
  --size: 20px; }

:host([size='mini']) {
  font-size: 12px; }
  :host([size='mini']) label {
    height: 20px; }
  :host([size='mini']) .dot {
    --size: 14px; }

:host([color='red']) label.checked {
  color: #ff5061; }
  :host([color='red']) label.checked .dot {
    border-color: #ff5061; }
  :host([color='red']) label.checked .dot::after {
    background: #ff5061; }

:host([color='blue']) label.checked {
  color: #66b1ff; }
  :host([color='blue']) label.checked .dot {
    border-color: #66b1ff; }
  :host([color='blue']) label.checked .dot::after {
    background: #66b1ff; }

:host([color='green']) label.checked {
  color: #58d68d; }
  :host([color='green']) label.checked .dot {
    border-color: #58d68d; }
  :host([color='green']) label.checked .dot::after {
    background: #58d68d; }

:host([color='teal']) label.checked {
  color: #3fc2a7; }
  :host([color='teal']) label.checked .dot {
    border-color: #3fc2a7; }
  :host([color='teal']) label.checked .dot::after {
    background: #3fc2a7; }

:host([color='orange']) label.checked {
  color: #ffb618; }
  :host([color='orange']) label.checked .dot {
    border-color: #ffb618; }
  :host([color='orange']) label.checked .dot::after {
    background: #ffb618; }

:host([color='dark']) label.checked {
  color: #62778d; }
  :host([color='dark']) label.checked .dot {
    border-color: #62778d; }
  :host([color='dark']) label.checked .dot::after {
    background: #62778d; }

:host([color='purple']) label.checked {
  color: #ac61ce; }
  :host([color='purple']) label.checked .dot {
    border-color: #ac61ce; }
  :host([color='purple']) label.checked .dot::after {
    background: #ac61ce; }
</style>
  <label>
    <wc-icon class="dot" is="checkbox-off"></wc-icon>
    <slot></slot>
  </label>
`
      

    this.__SWITCH__ = this.root.lastElementChild
    this.__ICO__ = this.__SWITCH__.children[0]
  }

  get value() {
    return this.props.value
  }

  set value(val) {
    log(val, this, this.props.label)
    if (Array.isArray(val)) {
      this.props.value = val
      this.checked = this.props.value.includes(this.props.label)
    } else {
      console.error('checkbox组件的value必须是数组, 当前为: ' + typeof val)
    }
  }

  get checked() {
    return this.props.checked
  }

  set checked(val) {
    this.props.checked = !!val
    var { value, checked, label, color } = this.props
    this.__SWITCH__.classList.toggle('checked', checked)
    this.__ICO__.setAttribute('is', 'checkbox-' + (checked ? 'on' : 'off'))

    var idx = value.indexOf(label)
    if (checked) {
      this.__ICO__.setAttribute('color', color)
      if (idx < 0) {
        value.push(label)
      }
    } else {
      this.__ICO__.removeAttribute('color')
      if (~idx) {
        value.splice(idx, 1)
      }
    }
  }

  get readonly() {
    return this.props.readonly
  }

  set readonly(val) {
    var type = typeof val

    if (val === this.props.readonly) {
      return
    }
    if ((type === 'boolean' && val) || type !== 'boolean') {
      this.props.readonly = true
      this.setAttribute('readonly', '')
    } else {
      this.props.readonly = false
      this.removeAttribute('readonly')
    }
  }

  get disabled() {
    return this.props.disabled
  }

  set disabled(val) {
    var type = typeof val

    if (val === this.props.disabled) {
      return
    }
    if ((type === 'boolean' && val) || type !== 'boolean') {
      this.props.disabled = true
      this.setAttribute('disabled', '')
    } else {
      this.props.disabled = false
      this.removeAttribute('disabled')
    }
  }

  connectedCallback() {
    this._handlClick = bind(this, 'click', ev => {
      ev.preventDefault()

      if (!this.disabled && !this.readonly) {
        this.checked = !this.checked
        this.dispatchEvent(new CustomEvent('input'))
      }
    })
  }

  disconnectedCallback() {
    unbind(this, 'click', this._handlClick)
  }

  attributeChangedCallback(name, old, val) {
if (val === null || old === val) {return}
    switch (name) {
      case 'label':
      case 'color':
        this.props[name] = val
        break

      case 'checked':
      case 'readonly':
      case 'disabled':
        this[name] = true
        break
    }
  }
}


if(!customElements.get('wc-checkbox')){
  customElements.define('wc-checkbox', Checkbox)
}
