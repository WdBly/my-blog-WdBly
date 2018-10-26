webpackJsonp([9],{

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fed36922_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(240);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(238)
}
var normalizeComponent = __webpack_require__(78)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-fed36922"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_fed36922_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\Home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-fed36922", Component.options)
  } else {
    hotAPI.reload("data-v-fed36922", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 224:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = __webpack_require__(49);

var _extends3 = _interopRequireDefault(_extends2);

var _vuex = __webpack_require__(84);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "home",
    data: function data() {
        return {
            select: '',
            options: [],
            value: '',
            topSearchContent: '',
            pageNum: 1,
            pageSize: 10000,
            loadding: true
        };
    },
    asyncData: function asyncData(_ref) {
        var store = _ref.store,
            route = _ref.route;

        // 触发 action 后，会返回 Promise
        return store.dispatch("getArticleList", {
            pageNum: 1,
            pageSize: 10000,
            search: ""
        });
    },

    computed: (0, _extends3.default)({}, (0, _vuex.mapGetters)(["articleList", "total"]), {
        dynamicSpace: function dynamicSpace() {
            if (true) {
                return document.documentElement.clientWidth < 700 ? 190 : 260;
            }
        }
    }),
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
        getArticleClass: function getArticleClass() {
            var _this = this;

            this.$http.get("/article/getArticleClass").then(function (res) {
                if (res.data.code === 200) {
                    _this.value = '';
                    _this.options = res.data.data;
                } else {
                    _this.$message.error(res.data.message);
                }
            }).catch(function (err) {
                console.log(err);
            });
        },
        getArticleList: function getArticleList() {
            var _this2 = this;

            this.$store.dispatch("getArticleList", {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                search: this.topSearchContent
            }).then(function (res) {
                _this2.loadding = false;
                if (res.data.code !== 200) {
                    _this2.$message.error(res.data.message);
                }
            });
        }
    },
    mounted: function mounted() {
        this.getArticleClass();
        this.getArticleList();
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

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(239);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(77)("1fad17e2", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fed36922\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-fed36922\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Home.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(48)(false);
// imports


// module
exports.push([module.i, "\n.topSearch[data-v-fed36922] {\n  padding: 10px 0 15px 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  -ms-flex-wrap: nowrap;\n      flex-wrap: nowrap;\n}\n.homeContent[data-v-fed36922] {\n  position: relative;\n  margin-top: 10px;\n}\n.homeContent .contentPopover[data-v-fed36922] {\n    width: calc(100% - 150px);\n    position: absolute;\n    left: 150px;\n    top: 0;\n}\n.homeContent .contentPopover .elCardClass[data-v-fed36922] {\n      -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);\n              box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);\n      margin-top: 48.4px;\n      padding: 15px;\n      background-color: #fff;\n}\n.homeContent .contentPopover .elCardClass[data-v-fed36922]:first-child {\n        margin-top: 0;\n}\n.homeContent .contentPopover .elCardClass .articleTitleText[data-v-fed36922] {\n        font-size: 20px;\n        font-weight: bold;\n        color: black;\n        margin-bottom: 15px;\n}\n.homeContent .contentPopover .elCardClass .bottomContent[data-v-fed36922] {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex;\n        -webkit-box-pack: start;\n            -ms-flex-pack: start;\n                justify-content: start;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .everArticleImg[data-v-fed36922] {\n          width: 200px;\n          height: 140px;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight[data-v-fed36922] {\n          display: -webkit-box;\n          display: -ms-flexbox;\n          display: flex;\n          width: calc(100% - 230px);\n          margin-left: 20px;\n          -webkit-box-pack: justify;\n              -ms-flex-pack: justify;\n                  justify-content: space-between;\n          -webkit-box-orient: vertical;\n          -webkit-box-direction: normal;\n              -ms-flex-direction: column;\n                  flex-direction: column;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .articleIntroduction[data-v-fed36922] {\n            word-wrap: break-word;\n            height: 90px;\n            text-overflow: ellipsis;\n            overflow: hidden;\n            font-size: 18px;\n            color: black;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .readAllArticleButton[data-v-fed36922] {\n            width: 100px;\n            text-indent: -5px;\n            margin-left: calc(100% - 100px);\n}\n.elPagination[data-v-fed36922] {\n  float: right;\n  margin: 0 20% 20px 0;\n}\n@media screen and (max-width: 700px) {\n.topSearch[data-v-fed36922] {\n    width: 100%;\n}\n.homeContent .contentPopover[data-v-fed36922] {\n    width: 100%;\n    left: 0;\n}\n.homeContent .contentPopover .elCardClass[data-v-fed36922] {\n      margin-top: 20px;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .everArticleImg[data-v-fed36922] {\n        width: 30%;\n        height: 100px;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight[data-v-fed36922] {\n        -webkit-box-flex: 1;\n            -ms-flex: 1;\n                flex: 1;\n        margin-left: 10px;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .articleIntroduction[data-v-fed36922] {\n          height: 40px;\n          font-size: 16px;\n          width: 100%;\n}\n.homeContent .contentPopover .elCardClass .bottomContent .bottomContentRight .readAllArticleButton[data-v-fed36922] {\n          width: 100px;\n          text-indent: -5px;\n}\n.timeLine[data-v-fed36922] {\n    width: 0;\n    opacity: 0;\n}\n.elPagination[data-v-fed36922] {\n    margin: 30px 0 20px 0;\n}\n}\n", ""]);

// exports


/***/ }),

/***/ 240:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "el-card",
    {
      directives: [
        {
          name: "loading",
          rawName: "v-loading",
          value: _vm.loadding,
          expression: "loadding"
        }
      ],
      staticClass: "box-card",
      staticStyle: { width: "100%", "margin-top": "10px" }
    },
    [
      _c("div", { staticClass: "topSearch" }, [
        _c(
          "div",
          [
            _c("span", [_vm._v("文章分类:")]),
            _vm._v(" "),
            _c(
              "el-select",
              {
                staticStyle: { width: "40%" },
                attrs: { size: "mini", placeholder: "请选择" },
                model: {
                  value: _vm.value,
                  callback: function($$v) {
                    _vm.value = $$v
                  },
                  expression: "value"
                }
              },
              _vm._l(_vm.options, function(item) {
                return _c("el-option", {
                  key: item.value,
                  attrs: { label: item.label, value: item.value }
                })
              })
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticStyle: { display: "flex", "justify-content": "flex-end" } },
          [
            _c("el-input", {
              staticStyle: { width: "80%" },
              attrs: {
                "prefix-icon": "el-icon-search",
                size: "mini",
                placeholder: "请输入关键字"
              },
              on: { change: _vm.searchArticleList },
              model: {
                value: _vm.topSearchContent,
                callback: function($$v) {
                  _vm.topSearchContent = $$v
                },
                expression: "topSearchContent"
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "homeContent" },
        [
          _c(
            "el-steps",
            {
              staticClass: "timeLine",
              attrs: {
                direction: "vertical",
                active: 0,
                space: _vm.dynamicSpace
              }
            },
            _vm._l(_vm.articleList, function(item, index) {
              return _c("el-step", {
                key: index,
                attrs: { title: item.created_at.substr(0, 10) }
              })
            })
          ),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "contentPopover" },
            _vm._l(_vm.articleList, function(item, index) {
              return _c("div", { key: index, staticClass: "elCardClass" }, [
                _c("header", { staticClass: "articleTitleText" }, [
                  _vm._v(_vm._s(item.title))
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "bottomContent" }, [
                  _c("img", {
                    staticClass: "everArticleImg",
                    attrs: { src: item.img }
                  }),
                  _vm._v(" "),
                  _c(
                    "div",
                    { staticClass: "bottomContentRight" },
                    [
                      _c("div", { staticClass: "articleIntroduction" }, [
                        _vm._v(_vm._s(item.description))
                      ]),
                      _vm._v(" "),
                      _c(
                        "el-button",
                        {
                          staticClass: "readAllArticleButton",
                          attrs: { type: "success" },
                          on: {
                            click: function($event) {
                              _vm.readFullArticle(item.id)
                            }
                          }
                        },
                        [_vm._v("阅读全文>>")]
                      )
                    ],
                    1
                  )
                ])
              ])
            })
          ),
          _vm._v(" "),
          _c("el-pagination", {
            staticClass: "elPagination",
            attrs: {
              "current-page": _vm.pageNum,
              "page-size": _vm.pageSize,
              layout: "total, prev, pager, next, jumper",
              total: _vm.total
            },
            on: {
              "current-change": _vm.handleCurrentChange,
              "update:currentPage": function($event) {
                _vm.pageNum = $event
              }
            }
          })
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-fed36922", esExports)
  }
}

/***/ })

});