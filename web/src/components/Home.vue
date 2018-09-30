<template>
    <el-card  v-loading="loadingHomeContent" class="box-card" style="width: 100%;margin-top: 10px;">
        <div class="topSearch">
            <div>
                <span>文章分类:</span>
                <el-select v-model="value" size="mini" placeholder="请选择" style="width:40%">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="display: flex;justify-content: flex-end">
                <el-input style="width:80%;"  prefix-icon="el-icon-search" v-model="topSearchContent" @change="searchArticleList" size="mini" placeholder="请输入关键字"></el-input>
            </div>
        </div>
        <div class="homeContent">
            <el-steps direction="vertical"
                      :active="0"
                      class="timeLine"
                      :space="dynamicSpace">
                <el-step v-for="(item,index) in aScreenArticle"
                         :title="item.created_at.substr(0,10)"
                         :key="index"></el-step>
            </el-steps>
            <div class="contentPopover">
                <div class="elCardClass"
                     v-for="(item,index) in aScreenArticle"
                     :key="index">
                    <header class="articleTitleText">{{item.title}}</header>
                    <div class="bottomContent">
                        <img class="everArticleImg" :src="item.img"/>
                        <div class="bottomContentRight">
                            <div class="articleIntroduction">{{item.description}}</div>
                            <el-button @click="readFullArticle(item.id)" type="success" class="readAllArticleButton">阅读全文>></el-button>
                        </div>
                    </div>
                </div>
            </div>
            <el-pagination class="elPagination"
                           @current-change="handleCurrentChange"
                           :current-page.sync="pageNum"
                           :page-size="pageSize"
                           layout="total, prev, pager, next, jumper"
                           :total="total">
            </el-pagination>
        </div>
    </el-card>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "home",
        data(){
            return {
                aScreenArticle:[],
                select:'',
                options: [],
                value: '',
                topSearchContent: '',
                pageNum: 1,
                total: 0,
                pageSize: 10000,
                loadingHomeContent: true
            }
        },
        computed:{
            dynamicSpace(){
                return document.documentElement.clientWidth<700?190:260
            }
        },
        methods:{
            handleCurrentChange() {
                this.getArticleList();
            },
            readFullArticle(id){
                this.$router.push({ path: `/displayArticle/${id}` })
            },
            searchArticleList(){
                this.getArticleList()
            },
            getArticleClass(){
                this.$http.get("/article/getArticleClass").then((res)=>{
                    if(res.data.code === 200){
                        this.value = '';
                        this.options = res.data.data;
                    }else{
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    console.log(err);
                })
            },
            getArticleList(){
                this.loadingHomeContent = true;
                this.$http.post("/article/getArticleList",{
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    search:this.topSearchContent
                }).then((res)=>{
                    this.loadingHomeContent = false;
                    if(res.data.code===200){
                        this.aScreenArticle = res.data.data.list;
                        this.total = res.data.data.total;
                    }else{
                        this.aScreenArticle = [];
                        this.total = 0;
                        this.$message.error(res.data.message)
                    }
                }).catch((err)=>{
                    this.loadingHomeContent = false;
                    console.log(err);
                })
            }
        },
        mounted(){
            this.getArticleClass();
            this.getArticleList();
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .topSearch{
        padding: 10px 0 15px 0;
        display: flex;
        justify-content: space-between;
        flex-wrap:nowrap;
    }
    .homeContent{
        position: relative;
        margin-top: 10px;
        .contentPopover{
            width: calc(100% - 150px);
            position: absolute;
            left: 150px;
            top:0;
            .elCardClass {
                box-shadow: 0 2px 12px 0 rgba(0,0,0,.3);
                &:first-child{
                    margin-top: 0;
                }
                margin-top: 48.4px;
                padding: 15px;
                background-color: #fff;
                .articleTitleText{
                    font-size: 20px;
                    font-weight: bold;
                    color: black;
                    margin-bottom: 15px;
                }
                .bottomContent{
                    display: flex;
                    justify-content: start;
                    .everArticleImg{
                        width: 200px;
                        height:140px;
                    }
                    .bottomContentRight{
                        display: flex;
                        width: calc(100% - 230px);
                        margin-left: 20px;
                        justify-content: space-between;
                        flex-direction: column;
                        .articleIntroduction{
                            word-wrap: break-word;
                            height: 90px;
                            text-overflow:ellipsis;
                            overflow:hidden;
                            font-size: 18px;
                            color: black;
                        }
                        .readAllArticleButton{
                            width: 100px;
                            text-indent:-5px;
                            margin-left: calc(100% - 100px);
                        }
                    }
                }
            }
        }
    }
    .elPagination {
        float: right;
        margin: 0 20% 20px 0;
    }
    @media screen and (max-width: 700px){
        .topSearch{
            width: 100%;
        }
        .homeContent{
            .contentPopover{
                width:100%;
                left: 0;
                .elCardClass {
                    margin-top: 20px;
                    .bottomContent{
                        .everArticleImg{
                            width: 30%;
                            height:100px;
                        }
                        .bottomContentRight{
                            flex: 1;
                            margin-left: 10px;
                            .articleIntroduction{
                                height: 40px;
                                font-size: 16px;
                                width: 100%;
                            }
                            .readAllArticleButton{
                                width: 100px;
                                text-indent:-5px;
                            }
                        }
                    }
                }
            }
        }
        .timeLine{
            width: 0;
            opacity: 0;
        }
        .elPagination {
            margin: 30px 0 20px 0;
        }
    }
</style>