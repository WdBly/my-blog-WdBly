<template>
    <el-card  v-loading="loadingHomeContent" class="box-card" style="width: 100%;margin-top: 10px;">
<!--        <el-carousel :interval="6000" trigger="click" type="card" :height="elCarouselHeight">
            <el-carousel-item v-for="item in 6" :key="item">
                <h3>{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>-->
        <div class="topSearch">
            <div>
                <span>文章分类:</span>
                <el-select v-model="value" size="mini" placeholder="请选择">
                    <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="display: flex;">
                <el-input  prefix-icon="el-icon-search" v-model="addClass" @change="searchArticleList" size="mini" placeholder="请输入关键字"></el-input>
            </div>
        </div>
        <div style="height: 500px;overflow: auto"  @mousewheel="mousewheel($event)" @DOMMouseScroll="mousewheel($event)">
            <div class="homeContent">
                <el-steps direction="vertical"
                          :active="0"
                          class="timeLine"
                          :space="260">
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
                select:'',
                options: [],
                value: '',
                addClass: '',
                loadingHomeContent: true
            }
        },
        computed:{
            elCarouselHeight(){
                return document.documentElement.clientWidth<700?'120px':"200px"
            }
        },
        methods:{
            mousewheel(e){
                e = e || window.event;
                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                    if (e.wheelDelta > 0) { //当滑轮向上滚动时
                        //事件
                    }
                    if (e.wheelDelta < 0) { //当滑轮向下滚动时
                        console.log(e);
                    }
                } else if (e.detail) {  //Firefox滑轮事件
                    if (e.detail> 0) { //当滑轮向上滚动时
                        //事件
                    }
                    if (e.detail< 0) { //当滑轮向下滚动时
                        //事件
                    }
                }
            },
            readFullArticle(id){
                this.$router.push({ path: `/displayArticle/${id}` })
            },
            searchArticleList(){
                this.getArticleList()
            },
            getArticleClass(){
                this.$http.post("/article/getArticleClass",{
                    name:this.addClass
                }).then((res)=>{
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
                    pageNum:1,
                    pageSize:10,
                    search:this.addClass
                }).then((res)=>{
                    this.loadingHomeContent = false;
                    if(res.data.code===200){
                        this.aScreenArticle = res.data.data.list;
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
            this.getArticleClass();
            this.getArticleList();
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
        padding: 10px 0 15px 0;
        display: flex;
        justify-content: space-between;
        flex-wrap:wrap
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
                margin-top: 50px;
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