webpackJsonp([5],{V7L8:function(t,e){},XOum:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("bYXK"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);var c=n("Z934");var s=function(t){n("V7L8")},r=n("VU/8")(a.a,c.a,!1,s,"data-v-52d0d1bc",null);e.default=r.exports},Z934:function(t,e,n){"use strict";var i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"displayArticle"},[n("div",{staticClass:"content markdown-body",domProps:{innerHTML:t._s(t.articleContent.content)}}),t._v(" "),n("div",{staticClass:"footer"},[n("router-link",{staticStyle:{"margin-bottom":"12px"},attrs:{title:t.articleContent.class_name,to:"/main/archive/class/"+t.articleContent.ca_id}},[t._v("分类："+t._s(t.articleContent.class_name))]),t._v(" "),t._l(t.tags,function(e,i){return n("router-link",{key:i,staticClass:"tag",attrs:{title:e.label,to:"/main/archive/tag/"+e.value}},[t._v("\n            #"+t._s(e.label)+"\n        ")])}),t._v(" "),n("span",{staticStyle:{"margin-top":"12px"}},[t._v("最后更新时间: "+t._s(t.articleContent.updated_at&&t.articleContent.updated_at.substr(0,10)))])],2),t._v(" "),t.articleContent.next?n("div",{staticClass:"next-artice"},[n("router-link",{staticClass:"next-artice-link",attrs:{title:t.articleContent.next.title,to:"/main/displayArticle/"+t.articleContent.next.id}},[t._v("下一篇："+t._s(t.articleContent.next.title))])],1):t._e(),t._v(" "),n("div",{staticClass:"article-comment"},[n("div",{staticStyle:{"padding-bottom":"24px","border-bottom":"1px solid #eee"}},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.articleComment,expression:"articleComment"}],attrs:{maxlength:"1200",placeholder:"留下你的评论..."},domProps:{value:t.articleComment},on:{input:function(e){e.target.composing||(t.articleComment=e.target.value)}}}),t._v(" "),n("div",{staticClass:"submit-comment-btn",on:{click:t.submitComment}},[t._v("提交")])]),t._v(" "),n("div",{staticClass:"comment-list"},[n("h2",[t._v("全部评论"),n("span",{staticStyle:{"font-size":"14px",color:"#767676","margin-left":"4px"}},[t._v(t._s(t.commentList.length))])]),t._v(" "),t._l(t.commentList,function(e,i){return n("div",{key:e.id,staticClass:"comment-item"},[n("p",[t._v("游客评论于: "+t._s(e.created_at)+" "),n("span",[t._v(t._s(t.commentList.length-i)+"楼")])]),t._v(" "),n("div",[t._v(t._s(e.comment))])])}),t._v(" "),t.commentList.length?t._e():n("div",{staticClass:"no-comment"},[t._v("\n                暂时没有评论...\n            ")])],2)])])},staticRenderFns:[]};e.a=i},bYXK:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=c(n("Dd8w")),a=n("NYxO"),o=c(n("gyMJ"));function c(t){return t&&t.__esModule?t:{default:t}}e.default={props:["id"],name:"display-article",data:function(){return{vue_env:Object({NODE_ENV:"production"}).VUE_ENV,commentList:[],articleComment:""}},asyncData:function(t,e,n){var i=t.store,a=(t.route,e.replace("/main/displayArticle/",""));return i.dispatch("getArticleData",{id:{id:a},cookies:n})},computed:(0,i.default)({},(0,a.mapGetters)(["articleContent","tags"])),watch:{$route:function(){this.commentList=[],this.getArticleData(),this.getArticleComment(),window.scrollTo(0,0)}},methods:{submitComment:function(){var t=this;this.articleComment?o.default.addArticleComment({articleId:parseInt(this.id),comment:this.articleComment}).then(function(e){200===e.data.code&&t.getArticleComment()}):alert("请输入评论")},jumpTopFn:function(){if("server"!==Object({NODE_ENV:"production"}).VUE_ENV)var t=setInterval(function(){if(document.documentElement.scrollTop<=0)return document.documentElement.scrollTop=0,void clearInterval(t);document.documentElement.scrollTop-=50},5)},getArticleData:function(){var t=this;this.$store.dispatch("getArticleData",{id:{id:this.id}}).then(function(e){t.loadding=!1,200===e[0].data.code&&200===e[1].data.code||t.$message.error(e.data.message)})},getArticleComment:function(){var t=this;o.default.getArticleComment(parseInt(this.id)).then(function(e){200===e.data.code&&(t.commentList=e.data.data)})}},mounted:function(){window.__INITIAL_STATE__||this.getArticleData(),this.commentList=[],this.getArticleComment()},updated:function(){}}}});
//# sourceMappingURL=5.b99251ea07173d26f88f.js.map