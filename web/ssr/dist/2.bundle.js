exports.ids=[2],exports.modules={150:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(167),o=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);var s=a(185);var i=function(t){var e;(e=a(183)).__inject__&&e.__inject__(t)},c=a(58)(o.a,s.a,!1,i,"data-v-0da28726","3069f495");e.default=c.exports},151:function(t,e,a){"use strict";e.__esModule=!0;var n,o=a(152),r=(n=o)&&n.__esModule?n:{default:n};e.default=r.default||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}},152:function(t,e,a){t.exports={default:a(153),__esModule:!0}},153:function(t,e,a){a(154),t.exports=a(3).Object.assign},154:function(t,e,a){var n=a(9);n(n.S+n.F,"Object",{assign:a(155)})},155:function(t,e,a){"use strict";var n=a(55),o=a(156),r=a(157),s=a(56),i=a(57),c=Object.assign;t.exports=!c||a(26)(function(){var t={},e={},a=Symbol(),n="abcdefghijklmnopqrst";return t[a]=7,n.split("").forEach(function(t){e[t]=t}),7!=c({},t)[a]||Object.keys(c({},e)).join("")!=n})?function(t,e){for(var a=s(t),c=arguments.length,l=1,d=o.f,u=r.f;c>l;)for(var f,g=i(arguments[l++]),p=d?n(g).concat(d(g)):n(g),v=p.length,_=0;v>_;)u.call(g,f=p[_++])&&(a[f]=g[f]);return a}:c},156:function(t,e){e.f=Object.getOwnPropertySymbols},157:function(t,e){e.f={}.propertyIsEnumerable},167:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,o=a(151),r=(n=o)&&n.__esModule?n:{default:n},s=a(59);e.default={name:"tags",data:function(){return{}},asyncData:function(t,e,a){var n=t.store;t.route;return a&&n.dispatch("setCookie",a),n.dispatch("getTags",{cookies:a})},computed:(0,r.default)({},(0,s.mapGetters)(["tags"])),methods:{getTags:function(){this.$store.dispatch("getTags",{})}},beforeMount:function(){this.tags.length||this.getTags()}}},183:function(t,e,a){var n=a(184);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var o=a(28);t.exports.__inject__=function(t){o("55b26c54",n,!0,t)}},184:function(t,e,a){(t.exports=a(27)(!1)).push([t.i,".tags[data-v-0da28726]{padding:32px 70px;background:#fff}.total[data-v-0da28726]{margin-bottom:12px;font-size:18px;color:#767676}.tag-content[data-v-0da28726]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}.tag-content .tag-link[data-v-0da28726]{text-decoration:none;margin:18px 10px;padding:6px 0;border-bottom:1px dashed #a1a7be}.tag-content .tag-link[data-v-0da28726]:hover{cursor:pointer;color:#0090f0}.tag-content .tag-link.big[data-v-0da28726]{font-size:28px;font-weight:700;color:#363636}.tag-content .tag-link.medium[data-v-0da28726]{font-size:22px;font-weight:700}.tag-content .tag-link.normal[data-v-0da28726]{color:#767676}",""])},185:function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tags"},[t._ssrNode('<p class="total" data-v-0da28726>'+t._ssrEscape("共"+t._s(t.tags.length)+"个标签")+"</p> "),t._ssrNode('<div class="tag-content" data-v-0da28726>',"</div>",t._l(t.tags,function(e,n){return a("router-link",{key:n,staticClass:"tag-link",class:["big"===e.size?"big":"medium"===e.size?"medium":"normal"],attrs:{to:"/main/archive/tag/"+e.value}},[t._v("\n            "+t._s(e.label)+"\n        ")])}))],2)},staticRenderFns:[]};e.a=n}};