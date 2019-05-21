<template>
    <el-card  v-loading="loadding" class="box-card" style="width: 100%;margin-top: 10px;">
        <div class="topSearch">
            <div>
                <span style="color: #fff">文章分类:</span>
                <el-select v-model="curr_value" size="mini" placeholder="请选择" style="width:40%">
                    <el-option
                            v-for="item in articleClassList"
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
                <el-step v-for="item in articleList"
                         :title="item.created_at.substr(0,10)"
                         :key="item.id"></el-step>
            </el-steps>
            <div class="contentPopover">
                <div class="elCardClass"
                     v-for="item in articleList"
                     :key="item.id">
                    <header class="articleTitleText">{{item.title}}</header>
                    <div class="bottomContent">
                        <img class="everArticleImg" :src="imageFilter(item.img)"/>
                        <div class="bottomContentRight">
                            <div class="articleIntroduction">{{item.description}}</div>
                            <el-button @click="readFullArticle(item.id)" type="text" class="readAllArticleButton">阅读全文>></el-button>
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

    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "home",
        data(){
            return {
                select:'',
                curr_value: '',
                topSearchContent: '',
                pageNum: 1,
                pageSize: 10000,
                loadding: false,
                dynamicSpace: 260
            }
        },
        asyncData ({ store, route }, emp, cookies) {
            cookies && store.dispatch("setCookie",cookies);
            return store.dispatch("getHomeData",{
                pageNum: 1,
                pageSize: 10000,
                search: "",
                cookies
            })
        },
        computed:{
            ...mapGetters(["articleList","total","articleClassList"])
        },
        methods:{
            imageFilter(src) {
                src += "?imageView2/1/w/200/h/140/q/65/webp";
                return src;
            },
            handleCurrentChange() {
                this.getArticleList();
            },
            readFullArticle(id){
                this.$router.push({ path: `/displayArticle/${id}` })
            },
            searchArticleList(){
                this.getArticleList();
            },
            getHomeData(){
                this.$store.dispatch("getHomeData",{
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    search: this.topSearchContent
                }).then(res => {
                    this.loadding = false;
                    if(res[0].data.code !== 200 || res[1].data.code !== 200){
                        this.$message.error(res.data.message)
                    }
                })
            },
            getPosition(callback){
                var positionInfo = {
                    gps: false
                }

                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(function (position) {
                        positionInfo.gps = true;
                        positionInfo.lng = position.coords.latitude;
                        positionInfo.lat = position.coords.latitude;
                        callback(positionInfo);
                    },function(error) {
                        positionInfo.gps = false;
                        switch(error.code){
                            case error.PERMISSION_DENIED:
                                positionInfo.error="用户拒绝对获取地理位置的请求";
                                break;
                            case error.POSITION_UNAVAILABLE:
                                positionInfo.error="位置信息是不可用的";
                                break;
                            case error.TIMEOUT:
                                positionInfo.error="请求用户地理位置超时";
                                break;
                            case error.UNKNOWN_ERROR:
                                positionInfo.error="未知错误";
                                break;
                        }
                        callback(positionInfo);
                    });
                }else {
                    positionInfo.error="不支持定位";
                    callback(positionInfo);
                }
            }
        },
        beforeMount(){
            if(!this.articleList.length){
                this.loadding = true;
                this.getHomeData()
            }

            // this.getPosition(function(positionInfo) {
            //     console.log(positionInfo);
            // })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .box-card {
        background: none;
        border: none
    }
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
                box-shadow: 0 2px 12px 0 rgba(158, 175, 167, 0.8);
                background: rgba(255, 255, 255, 0.7);
                
                &:first-child{
                    margin-top: 0;
                }
                margin-top: 48.4px;
                padding: 15px;
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
                            color: #02abef;
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