<template>
    <!-- 免费简繁转换API接口， 免费图片转换API接口， 免费Excel转json API接口 -->
    <div id="main">
        <!-- 顶部导航， 响应式布局 -->
        <header class="header">
            <!-- 博客log -->
            <div class="blog-log">
                <h3 style="line-height: 40px">WdBly Blog</h3>
                <p>乘以风，破路之棘</p>
            </div>

            <!-- 展开收起按钮 -->
            <div class="show-nav" @click="showNav=!showNav">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>

            <!-- 导航组件 可复用 -->
            <nav class="nav" v-show="showNav">
                <router-link to="/main/home" class="item">首页</router-link>
                <router-link to="/main/categories" class="item">分类</router-link>
                <router-link to="/main/archive/all/all" class="item">归档</router-link>
                <router-link to="/main/tags" class="item">标签</router-link>
            </nav>
        </header>
        <!-- 主体内容 -->
        <div class="content">
            <!-- 左侧挂件 -->
            <div class="left-box">
                <!-- 博客title 关键字 前端学习，html5 react node vue angular webpack git学习 -->
                <div class="blog-log">
                    <h3 style="line-height: 40px">WdBly Blog</h3>
                    <span>乘以风，破路之棘</span>
                </div>
                <!-- 网站导航 -->
                <nav class="nav">
                    <router-link to="/main/home" class="item">首页</router-link>
                    <router-link to="/main/categories" class="item">分类</router-link>
                    <router-link to="/main/archive/all/all" class="item">归档</router-link>
                    <router-link to="/main/tags" class="item">标签</router-link>
                </nav>
                <!-- 站点概览 style="position: sticky; top: 0px" -->
                <div class="overview">
                    <img src="http://cdn.wddsss.com/image/article/51c770fc5af90a909309ece131d89614.png?imageView2/1/w/0/h/0/q/50/webp" />
                    <p class="name">周维 | Jim</p>
                    <p class="signature">乘以风，破路之棘</p>

                    <!-- 三个分类入口， 日志， web， app 都是进入归档页面 -->
                    <!-- <nav class="overview-nav">
                        <router-link to="/main/archive/level/pc" class="item">文章</router-link>
                        <router-link to="/main/archive/level/mobile" class="item">移动端</router-link>
                        <router-link to="/main/archive/level/log" class="item">日志</router-link>
                    </nav> -->

                    <!-- github, 个人网站, 等 -->
                    <div class="resouce">
                        <a href="https://github.com/WdBly" target="_blank">
                            <img src="http://cdn.wddsss.com/image/article/99a1c354794555c5c6aebec8cb8728dd.png?imageView2/1/w/200/h/200/q/100/webp" />
                            <span style="margin-left: 4px;">GitHub</span>
                        </a>
                    </div>
                    <!-- 友情链接 -->
                    <div class="links">
                        <a href="https://github.com/WdBly" target="_blank">...</a>
                        <a href="https://github.com/WdBly" target="_blank">...</a>
                        <a href="https://github.com/WdBly" target="_blank">...</a>
                    </div>
                </div>
                <!-- 广告 -->
                <div style="width: 240px; height: 300px">
                    <!-- side-bar -->
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6933753629630360"
                        data-ad-slot="1605857454"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    >
                    </ins>
                </div>
                <div style="width: 240px; height: 300px">
                    <!-- square -->
                    <ins class="adsbygoogle"
                        style="display:block"
                        data-ad-client="ca-pub-6933753629630360"
                        data-ad-slot="2446691056"
                        data-ad-format="auto"
                        data-full-width-responsive="true"
                    >
                    </ins>
                </div>
            </div>
            <!-- 右侧其他路由 -->
            <div class="content-box">
                <router-view />
            </div>
        </div>
        <!-- 底栏 -->
        <footer class="footer">
            WdBly blog copyright-蜀ICP备18002409号-1
        </footer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "mainContent",
        data(){
            return {
                showNav: false,
                routerText:"首页",
                showHeader:false
            }
        },
        computed:{
            ...mapGetters(["cookie"])
        },
        methods:{
            jumpTopFn(){
                let timer = setInterval(()=>{
                    if(document.documentElement.scrollTop<=0){
                        document.documentElement.scrollTop = 0;
                        clearInterval(timer);
                        return;
                    }
                    document.documentElement.scrollTop-=50;
                },5)
            },
            logout(){
                this.$confirm('此操作将退出并退回登陆界面, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http.post("/user/logout",null,this.ORIGIN).then((res)=>{
                         if(res.data.code===200){
                            this.$message.success(res.data.message);
                            this.$store.dispatch("setCookie",{});
                            this.$router.push("/login");
                            if(process.env.VUE_ENV !== "server"){
                                sessionStorage.clear();
                            }
                         }else{
                            this.$message.error(res.data.message)
                         }
                    }).catch((err)=>{
                        console.log(err);
                    })
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleCommand(key){
                this.$router.push({path:(key.split('-'))[0]});
                this.routerText = (key.split('-'))[1]
            },
            routerJump(){
                this.$router.push("/login")
            }
        },
        mounted() {
            // 动态添加google广告
            var ads = document.querySelectorAll('.adsbygoogle');
            Object.keys(ads).forEach(() => {
                (adsbygoogle = window.adsbygoogle || []).push({});
            })
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    #main {

        .header {
            height: 6px;
            position: relative;
            overflow: hidden;
            background: #a1a8bd;

            .show-nav {
                width: 25px;
                height: 30px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                cursor: pointer;
                position: absolute;
                left: 26px;
                top: 35px;

                .line {
                    height: 2px;
                    background: #fff;
                }
            }
        }

        .content {
            display: flex;
            justify-content: space-between;
            width: 1000px;
            margin: 0 auto;

            .left-box {
                width: 240px;
                margin-right: 24px;
            }

            .content-box {
                flex: 1
            }

            .overview {
                display: flex;
                flex-direction: column;
                align-items: center;
                background: #fff;
                margin-top: 24px;
                padding: 24px;
                color: #767676;

                img {
                    width: 120px;
                    height: 120px;
                    margin-bottom: 16px;
                }

                p {
                    padding-bottom: 8px;
                }

                .overview-nav {
                    display: flex;
                    justify-content: center;
                    margin-top: 12px;

                    .item {
                        border-bottom: none;
                        border-right: 1px solid #b5ada2;
                        width: 54px;
                        text-align: center;

                        &:last-child {
                            border: none;
                        }
                    }
                }

                .resouce, .links {
                    margin: 0;
                    padding: 12px 0;
                    width: 100%;
                    background: #fff;
                    border-top: 1px dashed #b5ada2;
                    display: flex;
                    flex-direction: column;

                    a {
                        cursor: pointer;
                        display: flex;
                        align-items: center;

                        img {
                            margin: 0;
                            width: 30px;
                            height: 30px;
                        }
                    }
                }
            }
        }

        .footer {
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-top: 1px solid #fff;
            color: #767676;
        }

        .blog-log {
            height: 100px;
            background: #a1a8bd;
            color: #fff;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
        }

        .nav {
            display: flex;
            flex-direction: column;
            color: #fff;
            background: #fff;
            padding: 24px;

            .item {
                color: #767676;
                padding: 5px;
                text-decoration: none;

                &:hover {
                    background: #a1a8bd;
                    color: #fff;
                }
            }
        }

        .router-link-active {
            color: #0090F0;
            border-bottom: 1px solid #a1a8bd;
        }
    }



    @media screen and (max-width: 990px){
        .header {
            height: auto !important;
        }
        .content {
            width: 100% !important;

            .left-box {
                display: none;
            }


            .content-box {
                width: 100%;
            }
        }
    }
</style>