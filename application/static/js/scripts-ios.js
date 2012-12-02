// tappable.js
(function(e,t){typeof define=="function"&&define.amd?define("tappable",[],function(){return t(e,window.document),e.tappable}):t(e,window.document)})(this,function(e,t){var n=Math.abs,r=function(){},i={noScroll:!1,activeClass:"tappable-active",onTap:r,onStart:r,onMove:r,onMoveOut:r,onMoveIn:r,onEnd:r,onCancel:r,allowClick:!1,boundMargin:50,noScrollDelay:0,activeClassDelay:0,inactiveClassDelay:0},s="ontouchend"in document,o={start:s?"touchstart":"mousedown",move:s?"touchmove":"mousemove",end:s?"touchend":"mouseup"},u=function(e,n){var r=t.elementFromPoint(e,n);return r.nodeType==3&&(r=r.parentNode),r},a=function(e){var t=e.target;if(t)return t;var n=e.targetTouches[0];return u(n.clientX,n.clientY)},f=function(e){return e.replace(/\s+/g," ").replace(/^\s+|\s+$/g,"")},l=function(e,t){if(!t)return;if(e.classList){e.classList.add(t);return}if(f(e.className).indexOf(t)>-1)return;e.className=f(e.className+" "+t)},c=function(e,t){if(!t)return;if(e.classList){e.classList.remove(t);return}e.className=e.className.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)"),"$1")},h=function(e,n){var r=t.documentElement,i=r.matchesSelector||r.mozMatchesSelector||r.webkitMatchesSelector||r.oMatchesSelector||r.msMatchesSelector;return i.call(e,n)},p=function(e,t){var n=!1;do n=h(e,t);while(!n&&(e=e.parentNode)&&e.ownerDocument);return n?e:!1};e.tappable=function(e,n){typeof n=="function"&&(n={onTap:n});var r={};for(var s in i)r[s]=n[s]||i[s];var f=r.containerElement||t.body,h,v,m,g,y,b=!1,w=!1,E=r.activeClass,S=r.activeClassDelay,x,T=r.inactiveClassDelay,N,C=r.noScroll,k=r.noScrollDelay,L,A=r.boundMargin;f.addEventListener(o.start,function(t){var n=p(a(t),e);if(!n)return;S?(clearTimeout(x),x=setTimeout(function(){l(n,E)},S)):l(n,E),T&&n==v&&clearTimeout(N),m=t.clientX,g=t.clientY;if(!m||!g){var i=t.targetTouches[0];m=i.clientX,g=i.clientY}h=n,b=!1,w=!1,y=C?n.getBoundingClientRect():null,k&&(clearTimeout(L),C=!1,L=setTimeout(function(){C=!0},k)),r.onStart.call(f,t,n)},!1),f.addEventListener(o.move,function(e){if(!h)return;C?e.preventDefault():clearTimeout(x);var t=e.target,n=e.clientX,i=e.clientY;if(!t||!n||!i){var s=e.changedTouches[0];n||(n=s.clientX),i||(i=s.clientY),t||(t=u(n,i))}C?n>y.left-A&&n<y.right+A&&i>y.top-A&&i<y.bottom+A?(w=!1,l(h,E),r.onMoveIn.call(f,e,t)):(w=!0,c(h,E),r.onMoveOut.call(f,e,t)):!b&&Math.abs(i-g)>10&&(b=!0,c(h,E),r.onCancel.call(t,e)),r.onMove.call(f,e,t)},!1),f.addEventListener(o.end,function(e){if(!h)return;clearTimeout(x);if(T){S&&!b&&l(h,E);var t=h;N=setTimeout(function(){c(t,E)},T)}else c(h,E);r.onEnd.call(f,e,h);var n=e.which==3||e.button==2;!b&&!w&&!n&&r.onTap.call(f,e,h),v=h,h=null,setTimeout(function(){m=g=null},400)},!1),f.addEventListener("touchcancel",function(e){if(!h)return;c(h,E),h=m=g=null,r.onCancel.call(f,e)},!1),r.allowClick||f.addEventListener("click",function(t){var n=p(t.target,e);n?t.preventDefault():m&&g&&Math.abs(t.clientX-m)<25&&Math.abs(t.clientY-g)<25&&(t.stopPropagation(),t.preventDefault())},!1)}});
// viper.js
(function(e,t){function n(e,t){e.push.apply(e,t?{}.toString.call(t)=="[object Array]"?t:[t]:[])}function r(e,t,n){for(var r=0,i=e.length;r<i;++r)e[r].call(t,n)}function i(e){if(!(this instanceof i))return new i(e);this.object=e.object,this.property=e.property,this.from=this._from=e.from||this.object[this.property],this.to={}.toString.call(e.to)=="[object Array]"?e.to:[e.to],this.target=0,this.parser=e.parser||function(e){var t=i.Parsers,n,r=[],s,o;for(s in t)t.hasOwnProperty(s)&&r.push(t[s]);r.sort(function(e,t){return(t.priority||0)-(e.priority||0)});for(s=0,o=r.length;s<o;++s){n=new r[s];if(n.parse(e)!=null)return n}return n=new t.Number,n.parse(e),n}(this.from),this.transition=e.transition||i.Transitions.linear,this.duration=e.duration||500,this.fps=e.fps||40,this.frameInterval=1e3/this.fps,this.frames=e.frames||~~(this.duration/this.frameInterval+.5),this.frame=e.frame==t?-1:0,this.running=!1,this.startHandlers=[],this.updateHandlers=[],this.finishHandlers=[],n(this.startHandlers,e.start),n(this.updateHandlers,e.update),n(this.finishHandlers,e.finish)}function f(e,t,n){return(t-e)*n+e}var s=i.prototype,o,u,a=e.Viper;s.start=function(){return this.running||(this.resume(),r(this.startHandlers,this,this.object)),this},s.stop=function(){return this.running&&(this.pause(),r(this.finishHandlers,this,this.object)),this},s.pause=function(e){if(this.running){this.running=this.time=!1,clearInterval(this.timer);var n=this;e!=t&&setTimeout(function(){n.resume()},e)}return this},s.resume=function(){if(!this.running&&this.frame<this.frames){var e=this;this.timer=setInterval(function(){e.step(+(new Date))},this.frameInterval),this.running=!0}return this},s.step=function(e){this.frame+=(e-(this.time||e))/this.frameInterval,this.time=e,this.object[this.property]=this.parser.compute(this.from,this.to[this.target],this.frame<this.frames?this.transition(this.frame/this.frames):1),r(this.updateHandlers,this,this.object),this.frame>=this.frames&&(this.frame=this.time=0,this.parser.parse(this.from=this.to[this.target++]),this.to[this.target]==t&&(this.parser.parse(this.from=this._from),this.target=0,this.stop()))},i.Transitions={linear:function(e){return e},sine:function(e){return 1-Math.cos(e*Math.PI/2)},elastic:function(e){return Math.pow(2,10*--e)*Math.cos(20*e*Math.PI/3)},bounce:function(e){var t=0,n=1,r;while(e<(7-4*t)/11)t+=n,n/=2;return r=(11-6*t-11*e)/4,n*n-r*r}};for(u in i.Transitions)i.Transitions.hasOwnProperty(u)&&(o=i.Transitions[u],o.out=function(e){return function(t){return 1-e(1-t)}}(o),o.inOut=function(e){return function(t){return(t>.5?2-e(2*(1-t)):e(2*t))/2}}(o));i.Parsers={Number:function(){this.parse=function(e,n){e+="";var r=/(\D*)(\d+)(.*)?/.exec(e)||[,,0/0],i=parseFloat(r[2]);return n||(this.prefix=r[1]||"",this.suffix=r[3]||"",this.value=i),isNaN(i)?t:i},this.compute=function(e,t,n){return this.prefix+f(this.value,this.parse(t,!0),n)+this.suffix}},Color:function(){this.parse=function(e,t){var n=parseInt,r;if(/^#[\da-f]{6}$/i.test(e))r=[n(e.substring(1,3),16),n(e.substring(3,5),16),n(e.substring(5,7),16)];else if(r=/^(rgb\()?(\d+),\s*(\d+),\s*(\d+)\)?$/.exec(e))r=[n(r[2]),n(r[3]),n(r[4])];return t||(this.value=r),r},this.compute=function(e,t,n){for(var r=[],i=this.parse(t,!0),s=0,o=this.value.length;s<o;++s)r.push(~~(f(this.value[s],i[s],n)+.5));return"rgb("+r+")"}},String:function(){this.parse=function(e){return""+e},this.compute=function(e,t,n){e+="",t+="";var r=~~(t.length*n+.5);return t.substr(0,r)+e.substr(r,e.length-r-~~((e.length-t.length)*n+.5))}}},i.Parsers.Color.priority=1,i.Parsers.String.priority=-9,i.noConflict=function(){return e.Viper=a,i},e.Viper=i})(this);