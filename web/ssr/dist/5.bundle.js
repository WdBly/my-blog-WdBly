exports.ids=[5],exports.modules={147:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a(165),i=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,function(){return n[t]})}(r);var o=a(178);var d=function(t){var e;(e=a(176)).__inject__&&e.__inject__(t)},s=a(58)(i.a,o.a,!1,d,"data-v-34d8bdd6","0489e860");e.default=s.exports},152:function(t,e,a){"use strict";e.__esModule=!0;var n,i=a(153),r=(n=i)&&n.__esModule?n:{default:n};e.default=r.default||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}},153:function(t,e,a){t.exports={default:a(154),__esModule:!0}},154:function(t,e,a){a(155),t.exports=a(3).Object.assign},155:function(t,e,a){var n=a(9);n(n.S+n.F,"Object",{assign:a(156)})},156:function(t,e,a){"use strict";var n=a(55),i=a(157),r=a(158),o=a(56),d=a(57),s=Object.assign;t.exports=!s||a(26)(function(){var t={},e={},a=Symbol(),n="abcdefghijklmnopqrst";return t[a]=7,n.split("").forEach(function(t){e[t]=t}),7!=s({},t)[a]||Object.keys(s({},e)).join("")!=n})?function(t,e){for(var a=o(t),s=arguments.length,c=1,l=i.f,u=r.f;s>c;)for(var f,p=d(arguments[c++]),_=l?n(p).concat(l(p)):n(p),v=_.length,b=0;v>b;)u.call(p,f=_[b++])&&(a[f]=p[f]);return a}:s},157:function(t,e){e.f=Object.getOwnPropertySymbols},158:function(t,e){e.f={}.propertyIsEnumerable},165:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n,i=a(152),r=(n=i)&&n.__esModule?n:{default:n},o=a(59);e.default={props:["id"],name:"display-article",data:function(){return{vue_env:"server"}},asyncData:function(t,e,a){var n=t.store,i=(t.route,e.replace("/main/displayArticle/",""));return n.dispatch("getArticleData",{id:{id:i},cookies:a})},computed:(0,r.default)({},(0,o.mapGetters)(["articleContent","tags"])),watch:{$route:function(){this.getArticleData(),window.scrollTo(0,0)}},methods:{jumpTopFn:function(){},getArticleData:function(){var t=this;this.$store.dispatch("getArticleData",{id:{id:this.id}}).then(function(e){t.loadding=!1,200===e[0].data.code&&200===e[1].data.code||t.$message.error(e.data.message)})}},beforeMount:function(){window.__INITIAL_STATE__||this.getArticleData()},updated:function(){}}},176:function(t,e,a){var n=a(177);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a(28);t.exports.__inject__=function(t){i("de13956e",n,!0,t)}},177:function(t,e,a){(t.exports=a(27)(!1)).push([t.i,".displayArticle[data-v-34d8bdd6]{position:relative;margin:0 auto}.content[data-v-34d8bdd6]{background-color:#fff;padding:20px}.footer[data-v-34d8bdd6]{background:#fff;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;padding:24px;color:#363636}.footer .tag[data-v-34d8bdd6]{line-height:30px}.next-artice[data-v-34d8bdd6]{padding:24px 24px 50px;background:#fff}.next-artice .next-artice-link[data-v-34d8bdd6]{border-top:1px solid #eee;width:100%;display:block;padding:20px 0;color:#0090f0}",""])},178:function(t,e,a){"use strict";var n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"displayArticle"},[t._ssrNode('<div class="content markdown-body" data-v-34d8bdd6>'+t._s(t.articleContent.content)+"</div> "),t._ssrNode('<div class="footer" data-v-34d8bdd6>',"</div>",[a("router-link",{staticStyle:{"margin-bottom":"12px"},attrs:{title:t.articleContent.class_name,to:"/main/archive/class/"+t.articleContent.ca_id}},[t._v("分类："+t._s(t.articleContent.class_name))]),t._ssrNode(" "),t._l(t.tags,function(e,n){return a("router-link",{key:n,staticClass:"tag",attrs:{title:e.label,to:"/main/archive/tag/"+e.value}},[t._v("\n            #"+t._s(e.label)+"\n        ")])}),t._ssrNode(' <span style="margin-top: 12px;" data-v-34d8bdd6>'+t._ssrEscape("最后更新时间: "+t._s(t.articleContent.updated_at&&t.articleContent.updated_at.substr(0,10)))+"</span>")],2),t._ssrNode(" "),t.articleContent.next?t._ssrNode('<div class="next-artice" data-v-34d8bdd6>',"</div>",[a("router-link",{staticClass:"next-artice-link",attrs:{title:t.articleContent.next.title,to:"/main/displayArticle/"+t.articleContent.next.id}},[t._v(t._s(t.articleContent.next.title))])],1):t._e()],2)},staticRenderFns:[]};e.a=n}};