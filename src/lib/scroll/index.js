/**
 *
 * @authors yutent (yutent@doui.cc)
 * @date    2019-12-11 17:59:30
 * @version v2.0.1
 * 
 */

'use strict'

import{bind,ebind,unbind}from"../utils.js";const IS_FF=!!window.sidebar;export default class Scroll extends HTMLElement{static get observedAttributes(){return[]}constructor(){super(),Object.defineProperty(this,"root",{value:this.attachShadow({mode:"open"}),writable:!0,enumerable:!1,configurable:!0}),Object.defineProperty(this,"props",{value:{},writable:!0,enumerable:!1,configurable:!0}),this.root.innerHTML='<style>*{box-sizing:border-box;margin:0;padding:0}::before,::after{box-sizing:border-box}:host{overflow:hidden;position:relative;display:flex;width:100%}:host .container{overflow:hidden;position:relative;width:100%;height:100%}.is-horizontal,.is-vertical{visibility:hidden;position:absolute;z-index:10240;opacity:0;transition:opacity 0.3s linear, visibility 0.3s linear}.is-horizontal .thumb,.is-vertical .thumb{display:block;border-radius:3px;background:rgba(44,47,53,0.25);cursor:default}.is-horizontal .thumb:hover,.is-vertical .thumb:hover{background:rgba(44,47,53,0.5)}.is-horizontal{left:0;bottom:1px;width:100%;height:6px}.is-horizontal .thumb{width:0;height:6px}.is-vertical{top:0;right:1px;width:6px;height:100%}.is-vertical .thumb{width:6px;height:0}:host(:hover) .is-horizontal,:host(:hover) .is-vertical{visibility:visible;opacity:1}\n</style> <div class="container"><slot></slot></div> <div class="is-horizontal"><span class="thumb"></span></div> <div class="is-vertical"><span class="thumb"></span></div> ',this.__BOX__=this.root.children[1],this.__X__=this.root.children[2].children[0],this.__Y__=this.root.children[3].children[0]}get scrollTop(){return this.__BOX__.scrollTop}set scrollTop(t){if((t=+t)==t){var{sh:s,oh:i,yh:e}=this.props;this.__BOX__.scrollTop=t;var o=this.__BOX__.scrollTop/(s-i)*(i-e);this.props.thumbY=o,this.__Y__.style.transform=`translateY(${o}px)`}}get scrollLeft(){return this.__BOX__.scrollLeft}set scrollLeft(t){if(n=+n,n==n){var{sw:s,ow:i,xw:e}=this.props;this.__BOX__.scrollLeft=n;var o=this.__BOX__.scrollLeft/(s-i)*(i-e);this.props.thumbX=o,this.__X__.style.transform=`translateX(${o}px)`}}get scrollHeight(){return this.__BOX__.scrollHeight}_fetchScrollX(t){var{sw:s,ow:i,xw:e}=this.props;return t<0?t=0:t>i-e&&(t=i-e),this.__BOX__.scrollLeft=t/(i-e)*(s-i),this.__X__.style.transform=`translateX(${t}px)`,t}_fetchScrollY(t){var{sh:s,oh:i,yh:e}=this.props;return t<0?t=0:t>i-e&&(t=i-e),this.__BOX__.scrollTop=t/(i-e)*(s-i),this.__Y__.style.transform=`translateY(${t}px)`,t}connectedCallback(){this._initFn=bind(this.__BOX__,"mouseenter",t=>{var s=this.__BOX__.offsetWidth,i=this.__BOX__.scrollWidth,e=this.__BOX__.offsetHeight,o=this.__BOX__.scrollHeight,r=e*e/o>>0,h=s*s/i>>0;r<50&&(r=50),h<50&&(h=50),h===s&&(h=0),r===e&&(r=0),this.props.oh=e,this.props.sh=o,this.props.ow=s,this.props.sw=i,this.props.yh=r,this.props.xw=h,this.__X__.style.width=h+"px",this.__Y__.style.height=r+"px"}),this._wheelFn=ebind(this.__BOX__,"wheel",t=>{t.preventDefault();var{sh:s,oh:i,yh:e,sw:o,ow:r,xw:h}=this.props;if(h||e){var _,l;if(IS_FF)_=t.deltaMode?10*t.deltaX:t.deltaX,l=t.deltaMode?10*t.deltaY:t.deltaY;else{var n=Math.abs(t.wheelDelta);n<120?(_=t.deltaX,l=t.deltaY):(_=t.deltaX/(n/120),l=t.deltaY/(n/120))}if(this.__BOX__.scrollTop+=l,this.__BOX__.scrollLeft+=_,h){var a=this.__BOX__.scrollLeft/(o-r)*(r-h);this.props.thumbX=a,this.__X__.style.transform=`translateX(${a}px)`}if(e){var p=this.__BOX__.scrollTop/(s-i)*(i-e);this.props.thumbY=p,this.__Y__.style.transform=`translateY(${p}px)`}}});var t,s,i,e,o=o=>{var{thumbY:r,thumbX:h}=this.props;null!==t&&(i=this._fetchScrollX(h+o.pageX-t)),null!==s&&(e=this._fetchScrollY(r+o.pageY-s))},r=h=>{t=null,s=null,this.props.thumbX=i,this.props.thumbY=e,unbind(document,"mousemove",o),unbind(document,"mouseup",r)};bind(this.__Y__,"mousedown",t=>{s=t.pageY,this.props.thumbY||(this.props.thumbY=0),bind(document,"mousemove",o),bind(document,"mouseup",r)}),bind(this.__X__,"mousedown",s=>{t=s.pageX,this.props.thumbX||(this.props.thumbX=0),bind(document,"mousemove",o),bind(document,"mouseup",r)}),this.__observer=new MutationObserver(this._initFn),this.__observer.observe(this,{childList:!0,subtree:!0,characterData:!0})}disconnectedCallback(){this.__observer.disconnect(),unbind(this.__BOX__,"mouseenter",this._initFn),unbind(this.__BOX__,"wheel",this._wheelFn)}};

if(!customElements.get('wc-scroll')){
  customElements.define('wc-scroll', Scroll)
}
