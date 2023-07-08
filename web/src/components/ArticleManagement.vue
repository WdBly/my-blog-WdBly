<template>
    <div style="padding: 10px 0;">
        <el-form :inline="true" size="small" class="demo-form-inline" style="height: 30px;margin-bottom: 10px">
            <el-input size="small" placeholder="搜索文章" prefix-icon="el-icon-search" v-model="topSearchContent"
                      @change="onSubmit"
                      style="width: 300px; float: right"></el-input>
            <el-form-item>
                <el-button  type="primary" icon="el-icon-plus" @click="newArticle">新建文章</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" size="mini"
                  border
                  v-loading="loadingHomeContent"
                  style="width:100%;">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline  class="demo-table-expand">
                        <el-form-item label="文章标题:">
                            <span>{{ props.row.title }}</span>
                        </el-form-item>
                        <el-form-item label="文章描述:">
                            <span>{{ props.row.description }}</span>
                        </el-form-item>
                        <el-form-item label="创建时间:">
                            <span>{{ props.row.created_at }}</span>
                        </el-form-item>
                        <el-form-item label="更新时间:">
                            <span>{{ props.row.updated_at }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="ID" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="文章标题"  show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="首图" width="50">
                <template slot-scope="scope">
                    <img :src="imageFilter(scope.row.img)" style="width: 25px;height: 25px"/>
                </template>
            </el-table-column>
            <el-table-column label="作者" width="150">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
                <template slot-scope="scope">
                    <el-button size="small" type="success" icon="el-icon-edit-outline"
                               @click="editArticle(scope.row.id)"
                               title="修改文章"></el-button>
                    <el-button type="danger" size="small" icon="el-icon-delete"
                               @click="delArticle(scope.row.id)"
                               title="删除文章"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "article-management",
        data(){
            return{
                tableData:[],
                loadingHomeContent:true,
                pageNum:1,
                pageSize:20000,
                topSearchContent:'',
                scrollDisable:true
            }
        },
        methods:{
            imageFilter(src) {
                src += "?imageView2/1/w/200/h/140/q/65/webp";
                return src;
            },
            onSubmit(){
                this.getArticleList();
            },
            newArticle(){
                this.$router.push("publishArticles/0")
            },
            editArticle(id){
                this.$router.push("publishArticles/"+id)
            },
            delArticle(id){
                this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post("/article/delArticle",{
                        id:id
                    }).then((res)=>{
                        if(res.data.code === 200){
                            document.documentElement.scrollTop = 0;
                            this.pageNum = 1;
                            this.$message.success(res.data.message);
                            this.getArticleList("delete");
                        }else{
                            this.$message.error(res.data.message)
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }).catch(() => {

                });
            },
            getArticleList(ope){
                this.loadingHomeContent = true;
                this.$http.post("/article/getArticleList",{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    search:this.topSearchContent
                }).then((res)=>{
                    this.loadingHomeContent = false;
                    if(res.data.code===200){
                        this.total = res.data.data.total;
                        if(ope==="delete"){
                            this.tableData=res.data.data.list;
                        }else{
                            this.tableData.push(...res.data.data.list);
                        }
                        this.scrollDisable = true;
                    }else{
                        this.tableData =[];
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    this.scrollDisable = true;
                    this.loadingHomeContent = false;
                    console.log(err);
                })
            }
        },
        mounted(){
            this.getArticleList();
        }
    }
</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .downUpAnimate{
        position: absolute;
        font-size: 30px;
        color: white;
        transform:rotate(270deg);
        left: calc((100% - 30px) / 2);
        animation:downUp 1.5s  infinite linear;
    }
    @keyframes downUp
    {
        from {
            top: 0;
            opacity: 1;
        }
        to {top: 30px;opacity: 0.5;}
    }
</style>
