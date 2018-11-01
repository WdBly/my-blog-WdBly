webpackJsonp([9],{

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_24817160_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(263);
function injectStyle (ssrContext) {
  __webpack_require__(261)
}
var normalizeComponent = __webpack_require__(92)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-24817160"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_24817160_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(54);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(93);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "home",
    data: function data() {
        return {
            select: '',
            curr_value: '',
            topSearchContent: '',
            pageNum: 1,
            pageSize: 10000,
            loadding: false,
            dynamicSpace: 260
        };
    },
    asyncData: function asyncData(_ref, emp, cookies) {
        var store = _ref.store,
            route = _ref.route;

        cookies && store.dispatch("setCookie", cookies);
        // 触发 action 后，会返回 Promise
        return store.dispatch("getHomeData", {
            pageNum: 1,
            pageSize: 10000,
            search: ""
        });
    },

    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["articleList", "total", "articleClassList"])),
    methods: {
        handleCurrentChange: function handleCurrentChange() {
            this.getArticleList();
        },
        readFullArticle: function readFullArticle(id) {
            this.$router.push({ path: '/displayArticle/' + id });
        },
        searchArticleList: function searchArticleList() {
            this.getArticleList();
        },
        getHomeData: function getHomeData() {
            var _this = this;

            this.$store.dispatch("getHomeData", {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                search: this.topSearchContent
            }).then(function (res) {
                _this.loadding = false;
                if (res[0].data.code !== 200 || res[1].data.code !== 200) {
                    _this.$message.error(res.data.message);
                }
            });
        }
    },
    beforeMount: function beforeMount() {
        if (!this.articleList.length) {
            this.loadding = true;
            this.getHomeData();
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(262);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(53)("d078a876", content, true, {});

/***/ }),

/***/ 262:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(52)(false);
// imports


// module
exports.push([module.i, ".topSearch[data-v-24817160]{padding:10px 0 15px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-wrap:nowrap;flex-wrap:nowrap}.homeContent[data-v-24817160]{position:relative;margin-top:10px}.homeContent .contentPopover[data-v-24817160]{width:calc(100% - 150px);position:absolute;left:150px;top:0}.homeContent .contentPopover .elCardClass[data-v-24817160]{-webkit-box-shadow:0 2px 12px 0 rgba(0,0,0,.3);box-shadow:0 2px 12px 0 rgba(0,0,0,.3);margin-top:48.4px;padding:15px;background-color:#fff}.homeContent .contentPopover .elCardClass[data-v-24817160]:first-child{margin-top:0}.homeContent .contentPopover .elCardClass .articleTitleText[data-v-24817160]{font-size:20px;font-weight:700;color:#000;margin-bottom:15px}.homeContent .contentPopover .elCardClass .bottomContent[data-v-24817160]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:start}.homeContent .contentPopover .elCardClass .bottomContent .everArticleImg[data-v-24817160]{width:200px;height:140px}.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight[data-v-24817160]{display:-webkit-box;display:-ms-flexbox;display:flex;width:calc(100% - 230px);margin-left:20px;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .articleIntroduction[data-v-24817160]{word-wrap:break-word;height:90px;text-overflow:ellipsis;overflow:hidden;font-size:18px;color:#000}.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .readAllArticleButton[data-v-24817160]{width:100px;text-indent:-5px;margin-left:calc(100% - 100px)}.elPagination[data-v-24817160]{float:right;margin:0 20% 20px 0}@media screen and (max-width:700px){.topSearch[data-v-24817160]{width:100%}.homeContent .contentPopover[data-v-24817160]{width:100%;left:0}.homeContent .contentPopover .elCardClass[data-v-24817160]{margin-top:20px}.homeContent .contentPopover .elCardClass .bottomContent .everArticleImg[data-v-24817160]{width:30%;height:100px}.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight[data-v-24817160]{-webkit-box-flex:1;-ms-flex:1;flex:1;margin-left:10px}.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .articleIntroduction[data-v-24817160]{height:40px;font-size:16px;width:100%}.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .readAllArticleButton[data-v-24817160]{width:100px;text-indent:-5px}.timeLine[data-v-24817160]{width:0;opacity:0}.elPagination[data-v-24817160]{margin:30px 0 20px}}", ""]);

// exports


/***/ }),

/***/ 263:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-card',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.loadding),expression:"loadding"}],staticClass:"box-card",staticStyle:{"width":"100%","margin-top":"10px"}},[_c('div',{staticClass:"topSearch"},[_c('div',[_c('span',[_vm._v("文章分类:")]),_vm._v(" "),_c('el-select',{staticStyle:{"width":"40%"},attrs:{"size":"mini","placeholder":"请选择"},model:{value:(_vm.curr_value),callback:function ($$v) {_vm.curr_value=$$v},expression:"curr_value"}},_vm._l((_vm.articleClassList),function(item){return _c('el-option',{key:item.value,attrs:{"label":item.label,"value":item.value}})}))],1),_vm._v(" "),_c('div',{staticStyle:{"display":"flex","justify-content":"flex-end"}},[_c('el-input',{staticStyle:{"width":"80%"},attrs:{"prefix-icon":"el-icon-search","size":"mini","placeholder":"请输入关键字"},on:{"change":_vm.searchArticleList},model:{value:(_vm.topSearchContent),callback:function ($$v) {_vm.topSearchContent=$$v},expression:"topSearchContent"}})],1)]),_vm._v(" "),_c('div',{staticClass:"homeContent"},[_c('el-steps',{staticClass:"timeLine",attrs:{"direction":"vertical","active":0,"space":_vm.dynamicSpace}},_vm._l((_vm.articleList),function(item){return _c('el-step',{key:item.id,attrs:{"title":item.created_at.substr(0,10)}})})),_vm._v(" "),_c('div',{staticClass:"contentPopover"},_vm._l((_vm.articleList),function(item){return _c('div',{key:item.id,staticClass:"elCardClass"},[_c('header',{staticClass:"articleTitleText"},[_vm._v(_vm._s(item.title))]),_vm._v(" "),_c('div',{staticClass:"bottomContent"},[_c('img',{staticClass:"everArticleImg",attrs:{"src":item.img}}),_vm._v(" "),_c('div',{staticClass:"bottomContentRight"},[_c('div',{staticClass:"articleIntroduction"},[_vm._v(_vm._s(item.description))]),_vm._v(" "),_c('el-button',{staticClass:"readAllArticleButton",attrs:{"type":"success"},on:{"click":function($event){_vm.readFullArticle(item.id)}}},[_vm._v("阅读全文>>")])],1)])])})),_vm._v(" "),_c('el-pagination',{staticClass:"elPagination",attrs:{"current-page":_vm.pageNum,"page-size":_vm.pageSize,"layout":"total, prev, pager, next, jumper","total":_vm.total},on:{"current-change":_vm.handleCurrentChange,"update:currentPage":function($event){_vm.pageNum=$event}}})],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

});