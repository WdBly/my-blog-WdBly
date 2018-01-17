<template>
    <el-card class="box-card" style="width: 100%;">
        <el-carousel :interval="6000" trigger="click" type="card" :height="elCarouselHeight">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
        <div class="homeContent" :style="{height:(aScreenArticle.length+1)*200+'px'}">
            <el-steps direction="vertical" :active="1" class="timeLine">
                <el-step v-for="(item,index) in aScreenArticle"
                         :title="item.time"
                :key="index"></el-step>
            </el-steps>
            <div class="contentPopover">
                <el-card class="elCardClass"
                         v-for="(item,index) in aScreenArticle"
                         :style="{marginTop:index==0?'0px':elCarouselHeight=='120px'?'20px':'114px'}"
                         :key="index">
                    <header class="articleTitleText">这是文章标题</header>
                    <div class="bottomContent">
                        <img class="everArticleImg" src="../../static/images/loginBg.jpg"/>
                        <div class="bottomContentRight">
                            <div class="articleIntroduction">qweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqweqwe</div>
                            <el-button type="success" class="readAllArticleButton">阅读全文>></el-button>
                        </div>
                    </div>
                </el-card>
            </div>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {
                aScreenArticle:[{
                    time:"2018/06/30"
                },{
                    time:"2018/06/30"
                },{
                    time:"2018/06/30"
                },{
                    time:"2018/06/30"
                }]
            }
        },
        computed:{
            elCarouselHeight(){
                return document.documentElement.clientWidth<700?'120px':"200px"
            }
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
    .homeContent{
        position: relative;
        margin-top: 10px;
        .contentPopover{
            width: calc(100% - 150px);
            position: absolute;
            left: 150px;
            top:0;
            .elCardClass {
                background-color: red;
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
                        width: calc(100% - 200px);
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
    @media screen and (max-width: 1200px){
        .homeContent{
            position: relative;
            margin-top: 10px;
            .contentPopover{
                width: calc(100% - 150px);
                position: absolute;
                left: 150px;
                top:0;
                .elCardClass {
                    background-color: red;
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
                            width: calc(100% - 200px);
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
    }
    @media screen and (max-width: 700px){
        .homeContent{
            .contentPopover{
                width:100%;
                left: 0;
                .elCardClass {
                    height:170px;
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
                                margin-left: 0px;
                            }
                        }
                    }
                }
            }
        }
        .timeLine{
            display: none;
        }
    }
</style>