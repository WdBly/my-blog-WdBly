<template>
    <div class="userManagement" v-loading="userLoading">
        <el-form :inline="true" size="small" class="demo-form-inline" style="height: 30px;margin-bottom: 10px">
            <el-input size="small" placeholder="搜索用户" prefix-icon="el-icon-search" v-model="topSearchContent"
                      @change="onSubmit"
                      style="width: 300px; float: right"></el-input>
            <el-form-item>
                <el-button  type="primary" @click="addUser" icon="el-icon-plus">添加</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="tableData" :height="tableH" size="mini"
                  border
                  style="width:100%;">
            <el-table-column label="ID" width="80">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="账号" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="电话">
                <template slot-scope="scope">
                    <i class="el-icon-phone"></i>
                    <span style="margin-left: 10px">{{ scope.row.mobile }}</span>
                </template>
            </el-table-column>
            <el-table-column label="邮箱" show-overflow-tooltip>
                <template slot-scope="scope">
                    <i class="el-icon-message"></i>
                    <span style="margin-left: 10px">{{ scope.row.email}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" type="success" icon="el-icon-edit-outline"
                               @click.native.prevent="editUser(scope.$index, scope.row)"
                               title="修改用户"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete"
                               @click.native.prevent="handleDelete(scope.$index, scope.row, tableData)"
                               title="删除用户"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination style="float: right;margin-right: 5%;margin-top: 10px;"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="currentPage"
                       :page-size="pageSize"
                       layout="total, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
        <!--添加和编辑dialog-->
        <el-dialog :title="title" :visible.sync="dialogFormVisible"
                   :close-on-click-modal="false" top="8vh"
                   :close-on-press-escape="false" center>
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px"
                     class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                    <el-input type="text" v-model="ruleForm2.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="mobile">
                    <el-input type="mobile" v-model="ruleForm2.mobile" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="mobile" v-model="ruleForm2.email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" v-loading="addEditLoading">
                <el-button type="warning" @click="dialogFormVisible=!dialogFormVisible">取消编辑</el-button>
                <el-button type="primary" @click="submitForm('ruleForm2',1)" v-if="isUpdate == 1">保存数据</el-button>
                <el-button type="primary" @click="submitForm('ruleForm2',2, ruleForm2.id)" v-else>修改数据</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    let verRule = require('./../assets/js/unifiedVerificationRule');
    export default {
        data() {
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
                    email:''
                },
                rules2: {
                    username: [
                        {required: true, validator: verRule.validateUsername, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, validator: verRule.validatePassword, trigger: 'blur'}
                    ],
                    mobile: [
                        {required: true, validator: verRule.validateMobile, trigger: 'blur'}
                    ],
                    email: [
                        {required: true,validator: verRule.validateEmail,trigger: 'blur'}
                    ]
                }
            }
        },
        computed: {
            tableH() {
                return document.documentElement.clientHeight - 300;
            }
        },
        methods: {
            onSubmit() {
                if(this.currentPage ==1){
                    this.loadData(this.topSearchContent, this.currentPage, this.pageSize);
                }else{
                    this.currentPage = 1;
                }
            },
            //分页
            handleSizeChange(val) {
                this.loadData(this.topSearchContent, val, this.pageSize);
            },
            handleCurrentChange(val) {
                this.loadData(this.topSearchContent, val, this.pageSize);
            },
            //删除
            handleDelete(index, row, rows) {
                this.$confirm('确定要删除这条记录吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/user/delUser',{
                        id:row.id
                    }).then((res) => {
                        if (res.data.code === 200) {
                            this.loadData(this.topSearchContent, this.currentPage, this.pageSize);
                            this.$message.success(res.data.message);
                        } else {
                            this.$message.error(res.data.message);
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch((err) => {
                    console.log(err);
                });
            },
            addUser() {
                this.title = "添加用户";
                this.dialogFormVisible = true;
                this.isUpdate = 1;
                this.ruleForm2 = {
                    username: '',
                    mobile: '',
                    password: '',
                    email:''
                };
                this.$nextTick(()=>{
                    this.$refs['ruleForm2'].clearValidate();
                });
            },
            editUser(index, row) {
                this.title = "修改用户";
                this.isUpdate = 2;
                this.index=row.id;
                this.ruleForm2 = {
                    username: row.username,
                    mobile: row.mobile,
                    password: '',
                    email:row.email
                };
                this.$nextTick(()=>{
                    this.$refs['ruleForm2'].clearValidate();
                });
                this.dialogFormVisible = true;
            },
            //修改或者添加用户提交表单
            submitForm(formName, type, id) {
                var url = '',methods;
                this.addEditLoading = true;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = Object.assign(this.ruleForm2);
                        if (type === 1) {
                            url = '/user/addUser';
                            methods="post";
                        } else {
                            data.id = this.index;
                            url = '/user/editUser';
                            methods="post";
                        }
                        this.$http.post(url,data).then((res) => {
                            this.addEditLoading = false;
                            if (res.data.code === 200) {
                                this.$message.success(res.data.message);
                                this.dialogFormVisible = false;
                                this.loadData(this.topSearchContent, this.currentPage, this.pageSize);
                            } else {
                                this.$message.info(res.data.message);
                            }
                        }).catch((err) => {
                            this.$refs[formName].resetFields();
                            this.addEditLoading = false;
                        });
                    } else {
                        this.addEditLoading = false;
                        return false;
                    }
                });
            },
            //从服务器读取数据
            loadData(criteria, pageNum, pageSize) {
                this.userLoading = true;
                this.$http.post("/user/list",{
                    pageSize:pageSize,
                    pageNum:pageNum,
                    search:criteria,
                }).then((response) => {
                    if (response.data.code === 200) {
                        this.tableData = response.data.data.list;
                        this.total = response.data.data.total;
                    } else {
                        this.total = 0;
                        this.tableData = [];
                        this.$message.info(response.data.message);
                    }
                    this.userLoading = false;
                }).catch((err) => {
                    console.log(err);
                    this.userLoading = false;
                })
            }
        },
        mounted() {
            this.loadData(this.topSearchContent, this.currentPage, this.pageSize);
        }
    }
</script>
<style scoped lang="scss">
    .userManagement {
        margin-top: 10px;
    }
</style>

