<template>
    <el-card class="box-card" style="width: 100%;">
        <el-carousel :interval="6000" trigger="click" type="card" :height="elCarouselHeight">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="topSearch">
            <el-input placeholder="搜索文章" class="input-with-select">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                    <el-option label="餐厅名" value="1"></el-option>
                    <el-option label="订单号" value="2"></el-option>
                    <el-option label="用户电话" value="3"></el-option>
                </el-select>
            </el-input>
        </div>
        <div class="homeContent">
            <el-steps direction="vertical"
                      :active="0"
                      class="timeLine"
                      :space="260">
                <el-step v-for="(item,index) in aScreenArticle"
                         :title="item.created_at"
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
                            <el-button type="success" class="readAllArticleButton">阅读全文>></el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                aScreenArticle:[],
                select:''
            }
        },
        computed:{
            elCarouselHeight(){
                return document.documentElement.clientWidth<700?'120px':"200px"
            }
        },
        mounted(){
            this.$http.post("/article/getArticleList",{
                pageNum:1,
                pageSize:10,
                search:""
            }).then((res)=>{
                if(res.data.code===200){
                    this.aScreenArticle = res.data.data.list;
                }else{
                    this.$message.error(res.data.message)
                }
            }).catch((err)=>{
                console.log(err);
            })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
        background: url("../../static/images/e9137a57d4fb1b02417eac246db7110f.jpg");
    }
    .el-carousel__item:nth-child(2n+1) {
        background: url("../../static/images/loginBg.jpg");
    }
    .topSearch{
        margin: 5px 0;
        width: 40%;
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
                &:first-child{
                    margin-top: 0;
                }
                margin-top: 60px;
                padding: 15px;
                background-color: #4998D3;
                .articleTitleText{
                    font-size: 20px;
                    font-weight: bold;
                    color: white;
                    margin-bottom: 5px;
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
                            color: white;
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
    }
</style>