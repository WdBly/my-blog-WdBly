<template>
    <div style="padding: 10px 0">
        <el-table :data="tableData" size="mini"
                  border
                  v-loading="loadingHomeContent"
                  style="width:100%;">
            <el-table-column label="ID" width="50">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column label="文章标题" width="80" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.title }}</span>
                </template>
            </el-table-column>
            <el-table-column label="文章描述" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.description }}</span>
                </template>
            </el-table-column>
            <el-table-column label="首图" width="50">
                <template slot-scope="scope">
                    <img :src="scope.row.img" style="width: 25px;height: 25px"/>
                </template>
            </el-table-column>
            <el-table-column label="作者" width="50">
                <template slot-scope="scope">
                    <i class="el-icon-phone"></i>
                    <span style="margin-left: 10px">{{ scope.row.user }}</span>
                </template>
            </el-table-column>
            <el-table-column label="发布时间" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="更新时间" width="120">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="200">
                <template slot-scope="scope">
                    <el-button size="small" type="success" icon="el-icon-edit-outline"
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
                pageSize:10,
            }
        },
        methods:{
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
                            this.$message.success(res.data.message);
                            this.getArticleList();
                        }else{
                            this.$message.error(res.data.message)
                        }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }).catch(() => {

                });
            },
            getArticleList(){
                this.loadingHomeContent = true;
                this.$http.post("/article/getArticleList",{
                    pageNum:1,
                    pageSize:10,
                    search:''
                }).then((res)=>{
                    this.loadingHomeContent = false;
                    if(res.data.code===200){
                        this.tableData = res.data.data.list;
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
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

<style scoped>

</style>