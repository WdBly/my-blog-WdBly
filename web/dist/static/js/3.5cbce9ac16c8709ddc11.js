webpackJsonp([3],{"45Z9":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("7cLw"),n=a.n(s);for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);var r=a("Cyvo");var o=function(t){a("PBEj")},u=a("VU/8")(n.a,r.a,!1,o,"data-v-6f1c82b8",null);e.default=u.exports},"7cLw":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,n=a("Dd8w"),i=(s=n)&&s.__esModule?s:{default:s},r=a("NYxO");e.default={name:"tags",data:function(){return{}},asyncData:function(t,e,a){var s=t.store;t.route;return a&&s.dispatch("setCookie",a),s.dispatch("getTags",{cookies:a})},computed:(0,i.default)({},(0,r.mapGetters)(["tags"])),methods:{getTags:function(){this.$store.dispatch("getTags",{})}},beforeMount:function(){this.tags.length||this.getTags()}}},Cyvo:function(t,e,a){"use strict";var s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"tags"},[a("p",{staticClass:"total"},[t._v("共"+t._s(t.tags.length)+"个标签")]),t._v(" "),a("div",{staticClass:"tag-content"},t._l(t.tags,function(e,s){return a("router-link",{key:s,staticClass:"tag-link",class:["big"===e.size?"big":"medium"===e.size?"medium":"normal","tagsLink"+s],attrs:{to:"/main/archive/tag/"+e.value}},[t._v("\n            "+t._s(e.label)+"\n        ")])}))])},staticRenderFns:[]};e.a=s},PBEj:function(t,e){}});
//# sourceMappingURL=3.5cbce9ac16c8709ddc11.js.map