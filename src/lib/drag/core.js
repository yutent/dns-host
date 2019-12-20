"use strict";import $ from"../utils.js";const DEF_OPT={axis:"",limit:!1,overflow:!0};export default class Drag{constructor(t){this.$elem=t,this._init()}_init(){this.$elem.style.transform="";var{x:t,y:s}=this.$elem.getBoundingClientRect();this.pos={x:t,y:s,_x:0,_y:0}}by(t,s={}){return this.$drag=t,this.opt=Object.assign(Object.create(null),DEF_OPT,s),!1!==this.opt.limit&&(this.opt.overflow=!1),t.style.cursor="move",this._handleResize=$.bind(window,"resize",this._init.bind(this)),this._handleMousedown=$.bind(t,"mousedown",t=>{if(this.disabled)return;var s=this.$elem.getBoundingClientRect();s.x-this.pos._x!==this.pos.x&&(this.pos.x=s.x-this.pos._x),s.y-this.pos._y!==this.pos.y&&(this.pos.y=s.y-this.pos._y);let e=t.pageX,i=t.pageY,o=document.documentElement.clientWidth,n=document.documentElement.clientHeight,h=s.width,p=s.height,d=[0,o-h,n-p,0];if("parent"===this.opt.limit){let t=this.$elem.parentNode.getBoundingClientRect();d=[t.top,t.right-h,t.bottom-p,t.left]}let l=$.bind(document,"mousemove",t=>{t.preventDefault();let o=t.pageX-e+(s.x-this.pos.x),n=t.pageY-i+(s.y-this.pos.y);"x"===this.opt.axis&&(n=0),"y"===this.opt.axis&&(o=0),!1===this.opt.overflow&&(o<d[3]-this.pos.x?o=d[3]-this.pos.x:o>d[1]-this.pos.x&&(o=d[1]-this.pos.x),n<d[0]-this.pos.y?n=d[0]-this.pos.y:n>d[2]-this.pos.y&&(n=d[2]-this.pos.y)),this.pos._x=o,this.pos._y=n,this.$elem.dispatchEvent(new CustomEvent("dragging",{detail:{offset:{x:this.pos.x+o,y:this.pos.y+n},move:{x:o,y:n}}})),this.$elem.style.transform=`translate(${o}px, ${n}px)`}),m=$.bind(document,"mouseup",t=>{this.$elem.dispatchEvent(new CustomEvent("dragged",{detail:{offset:{x:this.pos.x+this.pos._x,y:this.pos.y+this.pos._y},move:{x:this.pos._x,y:this.pos._y}}})),$.unbind(document,"mousemove",l),$.unbind(document,"mouseup",m)})}),this}on(t,s){if(t&&"function"==typeof s)return $.bind(this,t,s)}off(t,s){$.unbind(this,t,s)}destroy(){$.unbind(window,"resize",this._handleResize),$.unbind(this.$drag,"mousedown",this._handleMousedown),delete this.$elem,delete this.$drag}};