exports.ids = [4];
exports.modules = {

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserManagement_vue__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserManagement_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserManagement_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserManagement_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserManagement_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_143fe72c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_UserManagement_vue__ = __webpack_require__(317);
function injectStyle (ssrContext) {
var i
;(i=__webpack_require__(314),i.__inject__&&i.__inject__(ssrContext),i)
}
var normalizeComponent = __webpack_require__(97)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-143fe72c"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = "0c3127fe"
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_UserManagement_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_143fe72c_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_UserManagement_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 270:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assign = __webpack_require__(104);

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var verRule = __webpack_require__(316);
exports.default = {
    data: function data() {
        //校验输入字段
        return {
            topSearchContent: "",
            userLoading: false,
            addEditLoading: false,
            tableData: [],
            dialogFormVisible: false,
            isUpdate: 1,
            index: 1,
            title: '',
            currentPage: 1, //当前页码
            pageSize: 10, //默认每页数据量
            total: 0, //默认数据总数
            ruleForm2: {
                username: '',
                password: '',
                mobile: '',
                email: ''
            },
            rules2: {
                username: [{ required: true, validator: verRule.validateUsername, trigger: 'blur' }],
                password: [{ required: true, validator: verRule.validatePassword, trigger: 'blur' }],
                mobile: [{ required: true, validator: verRule.validateMobile, trigger: 'blur' }],
                email: [{ required: true, validator: verRule.validateEmail, trigger: 'blur' }]
            }
        };
    },

    computed: {
        tableH: function tableH() {
            if (false) {
                return document.documentElement.clientHeight - 300;
            } else {
                return 500;
            }
        }
    },
    methods: {
        onSubmit: function onSubmit() {
            if (this.currentPage == 1) {
                this.loadData(this.topSearchContent, this.currentPage, this.pageSize);
            } else {
                this.currentPage = 1;
            }
        },

        //分页
        handleSizeChange: function handleSizeChange(val) {
            this.loadData(this.topSearchContent, val, this.pageSize);
        },
        handleCurrentChange: function handleCurrentChange(val) {
            this.loadData(this.topSearchContent, val, this.pageSize);
        },

        //删除
        handleDelete: function handleDelete(index, row, rows) {
            var _this = this;

            this.$confirm('确定要删除这条记录吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(function () {
                _this.$http.post('/user/delUser', {
                    id: row.id
                }).then(function (res) {
                    if (res.data.code === 200) {
                        _this.loadData(_this.topSearchContent, _this.currentPage, _this.pageSize);
                        _this.$message.success(res.data.message);
                    } else {
                        _this.$message.error(res.data.message);
                    }
                }).catch(function (err) {
                    console.log(err);
                });
            }).catch(function (err) {
                console.log(err);
            });
        },
        addUser: function addUser() {
            var _this2 = this;

            this.title = "添加用户";
            this.dialogFormVisible = true;
            this.isUpdate = 1;
            this.ruleForm2 = {
                username: '',
                mobile: '',
                password: '',
                email: ''
            };
            this.$nextTick(function () {
                _this2.$refs['ruleForm2'].clearValidate();
            });
        },
        editUser: function editUser(index, row) {
            var _this3 = this;

            this.title = "修改用户";
            this.isUpdate = 2;
            this.index = row.id;
            this.ruleForm2 = {
                username: row.username,
                mobile: row.mobile,
                password: '',
                email: row.email
            };
            this.$nextTick(function () {
                _this3.$refs['ruleForm2'].clearValidate();
            });
            this.dialogFormVisible = true;
        },

        //修改或者添加用户提交表单
        submitForm: function submitForm(formName, type, id) {
            var _this4 = this;

            var url = '',
                methods;
            this.addEditLoading = true;
            this.$refs[formName].validate(function (valid) {
                if (valid) {
                    var data = (0, _assign2.default)(_this4.ruleForm2);
                    if (type === 1) {
                        url = '/user/addUser';
                        methods = "post";
                    } else {
                        data.id = _this4.index;
                        url = '/user/editUser';
                        methods = "post";
                    }
                    _this4.$http.post(url, data).then(function (res) {
                        _this4.addEditLoading = false;
                        if (res.data.code === 200) {
                            _this4.$message.success(res.data.message);
                            _this4.dialogFormVisible = false;
                            _this4.loadData(_this4.topSearchContent, _this4.currentPage, _this4.pageSize);
                        } else {
                            _this4.$message.info(res.data.message);
                        }
                    }).catch(function (err) {
                        _this4.$refs[formName].resetFields();
                        _this4.addEditLoading = false;
                    });
                } else {
                    _this4.addEditLoading = false;
                    return false;
                }
            });
        },

        //从服务器读取数据
        loadData: function loadData(criteria, pageNum, pageSize) {
            var _this5 = this;

            this.userLoading = true;
            this.$http.post("/user/list", {
                pageSize: pageSize,
                pageNum: pageNum,
                search: criteria
            }).then(function (response) {
                if (response.data.code === 200) {
                    _this5.tableData = response.data.data.list;
                    _this5.total = response.data.data.total;
                } else {
                    _this5.total = 0;
                    _this5.tableData = [];
                    _this5.$message.info(response.data.message);
                }
                _this5.userLoading = false;
            }).catch(function (err) {
                console.log(err);
                _this5.userLoading = false;
            });
        }
    },
    mounted: function mounted() {
        this.loadData(this.topSearchContent, this.currentPage, this.pageSize);
    }
};

/***/ }),

/***/ 314:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(315);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(53)
module.exports.__inject__ = function (context) {
  add("3b8ec3d9", content, true, context)
};

/***/ }),

/***/ 315:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(52)(false);
// imports


// module
exports.push([module.i, ".userManagement[data-v-143fe72c]{margin-top:10px}", ""]);

// exports


/***/ }),

/***/ 316:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateUsername", function() { return validateUsername; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateCaptcha", function() { return validateCaptcha; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateCaptchaSix", function() { return validateCaptchaSix; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateName", function() { return validateName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateMobile", function() { return validateMobile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validatePassword", function() { return validatePassword; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateEmail", function() { return validateEmail; });
/**
 * Created by ZhouWei on 2017/12/28.
 */

//校验输入字段
var validateUsername = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('用户名不能为空'));
    }else if (!/^([a-zA-Z\u4e00-\u9fa5\.]){4,16}$/.test(value)) {
        callback(new Error('只能输入4-16个中文、英文、.等字符'));
    }else{
        callback();
    }
};

var validateCaptcha = (rule, value, callback) => {  //4位验证码
    if (value === '') {
        callback(new Error('验证码不能为空!'));
    }else if(!/^\d{4}$/.test(value)){
        callback(new Error('请输入正确的验证码!'));
    } else {
        callback();
    }
};

var validateCaptchaSix = (rule, value, callback) => { //6位验证码
    if (value === '') {
        callback(new Error('验证码不能为空!'));
    }else if(!/^\d{6}$/.test(value)){
        callback(new Error('请输入正确的验证码!'));
    } else {
        callback();
    }
};

var validateName = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('姓名不能为空'));
    }else if (!/^[a-zA-Z\u4e00-\u9fa5]{2,20}$/.test(value)) {
        callback(new Error('只能2-20个汉字或者英文'));
    }else{
        callback();
    }
};
var validateMobile = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('手机不能为空'));
    }else if (!(/^1[34578]\d{9}$/.test(value))) {
        callback(new Error('请正确填写您的手机号码'));
    }else {
        callback();
    }
};

var validatePassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('密码不能为空'));
    }else if (!(/^.{6,12}$/.test(value))) {
        callback(new Error('6-12位密码'));
    }else {
        callback();
    }
};

var validateEmail = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('邮箱不能为空'));
    }else if (!(/^([\w\.\-]+)@([\w\.\-]+)\.([\w]{2,4})$/.test(value))) {
        callback(new Error('邮箱格式不正确'));
    }else {
        callback();
    }
};



/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.userLoading),expression:"userLoading"}],staticClass:"userManagement"},[_c('el-form',{staticClass:"demo-form-inline",staticStyle:{"height":"30px","margin-bottom":"10px"},attrs:{"inline":true,"size":"small"}},[_c('el-input',{staticStyle:{"width":"300px","float":"right"},attrs:{"size":"small","placeholder":"搜索用户","prefix-icon":"el-icon-search"},on:{"change":_vm.onSubmit},model:{value:(_vm.topSearchContent),callback:function ($$v) {_vm.topSearchContent=$$v},expression:"topSearchContent"}}),_vm._v(" "),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary","icon":"el-icon-plus"},on:{"click":_vm.addUser}},[_vm._v("添加")])],1)],1),_vm._ssrNode(" "),_c('el-table',{staticStyle:{"width":"100%"},attrs:{"data":_vm.tableData,"height":_vm.tableH,"size":"mini","border":""}},[_c('el-table-column',{attrs:{"label":"ID","width":"80"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{staticStyle:{"margin-left":"10px"}},[_vm._v(_vm._s(scope.row.id))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"账号","show-overflow-tooltip":""},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('span',{staticStyle:{"margin-left":"10px"}},[_vm._v(_vm._s(scope.row.username))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"电话"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('i',{staticClass:"el-icon-phone"}),_vm._v(" "),_c('span',{staticStyle:{"margin-left":"10px"}},[_vm._v(_vm._s(scope.row.mobile))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"邮箱","show-overflow-tooltip":""},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('i',{staticClass:"el-icon-message"}),_vm._v(" "),_c('span',{staticStyle:{"margin-left":"10px"}},[_vm._v(_vm._s(scope.row.email))])]}}])}),_vm._v(" "),_c('el-table-column',{attrs:{"label":"操作"},scopedSlots:_vm._u([{key:"default",fn:function(scope){return [_c('el-button',{attrs:{"size":"small","type":"success","icon":"el-icon-edit-outline","title":"修改用户"},nativeOn:{"click":function($event){$event.preventDefault();_vm.editUser(scope.$index, scope.row)}}}),_vm._v(" "),_c('el-button',{attrs:{"type":"danger","size":"small","icon":"el-icon-delete","title":"删除用户"},nativeOn:{"click":function($event){$event.preventDefault();_vm.handleDelete(scope.$index, scope.row, _vm.tableData)}}})]}}])})],1),_vm._ssrNode(" "),_c('el-pagination',{staticStyle:{"float":"right","margin-right":"5%","margin-top":"10px"},attrs:{"current-page":_vm.currentPage,"page-size":_vm.pageSize,"layout":"total, prev, pager, next, jumper","total":_vm.total},on:{"size-change":_vm.handleSizeChange,"current-change":_vm.handleCurrentChange,"update:currentPage":function($event){_vm.currentPage=$event}}}),_vm._ssrNode(" "),_c('el-dialog',{attrs:{"title":_vm.title,"visible":_vm.dialogFormVisible,"close-on-click-modal":false,"top":"8vh","close-on-press-escape":false,"center":""},on:{"update:visible":function($event){_vm.dialogFormVisible=$event}}},[_c('el-form',{ref:"ruleForm2",staticClass:"demo-ruleForm",attrs:{"model":_vm.ruleForm2,"status-icon":"","rules":_vm.rules2,"label-width":"100px"}},[_c('el-form-item',{attrs:{"label":"账号","prop":"username"}},[_c('el-input',{attrs:{"type":"text","auto-complete":"off"},model:{value:(_vm.ruleForm2.username),callback:function ($$v) {_vm.$set(_vm.ruleForm2, "username", $$v)},expression:"ruleForm2.username"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"密码","prop":"password"}},[_c('el-input',{attrs:{"type":"password","auto-complete":"off"},model:{value:(_vm.ruleForm2.password),callback:function ($$v) {_vm.$set(_vm.ruleForm2, "password", $$v)},expression:"ruleForm2.password"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"电话","prop":"mobile"}},[_c('el-input',{attrs:{"type":"mobile","auto-complete":"off"},model:{value:(_vm.ruleForm2.mobile),callback:function ($$v) {_vm.$set(_vm.ruleForm2, "mobile", $$v)},expression:"ruleForm2.mobile"}})],1),_vm._v(" "),_c('el-form-item',{attrs:{"label":"邮箱","prop":"email"}},[_c('el-input',{attrs:{"type":"mobile","auto-complete":"off"},model:{value:(_vm.ruleForm2.email),callback:function ($$v) {_vm.$set(_vm.ruleForm2, "email", $$v)},expression:"ruleForm2.email"}})],1)],1),_vm._v(" "),_c('div',{directives:[{name:"loading",rawName:"v-loading",value:(_vm.addEditLoading),expression:"addEditLoading"}],staticClass:"dialog-footer",attrs:{"slot":"footer"},slot:"footer"},[_c('el-button',{attrs:{"type":"warning"},on:{"click":function($event){_vm.dialogFormVisible=!_vm.dialogFormVisible}}},[_vm._v("取消编辑")]),_vm._v(" "),(_vm.isUpdate == 1)?_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm2',1)}}},[_vm._v("保存数据")]):_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){_vm.submitForm('ruleForm2',2, _vm.ruleForm2.id)}}},[_vm._v("修改数据")])],1)],1)],2)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })

};;