<template>
    <!-- 免费简繁转换API接口， 免费图片转换API接口， 免费Excel转json API接口 -->
    <div id="main">
        <!-- 顶部导航， 响应式布局 -->
        <header class="header">
            <!-- 博客log -->
            <div class="blog-log">
                <h3 style="line-height: 40px">WdBly Blog</h3>
                <p>懂事、有趣、保持理智</p>
            </div>

            <!-- 展开收起按钮 -->
            <div class="show-nav" @click="showNav=!showNav">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>

            <!-- 导航组件 可复用 -->
            <nav class="nav" v-show="showNav">
                <router-link title="首页" to="/main/home" class="item">首页</router-link>
                <router-link title="分类" to="/main/categories" class="item">分类</router-link>
                <router-link title="归档" to="/main/archive/all/all" class="item">归档</router-link>
                <router-link title="标签" to="/main/tags" class="item">标签</router-link>
                <router-link title="资源" to="/main/sourceList" class="item">资源</router-link>
            </nav>
        </header>
        <!-- 主体内容 -->
        <div class="content">
            <!-- 左侧挂件 -->
            <div class="left-box">
                <!-- 博客title 关键字 前端学习，html5 react node vue angular webpack git学习 -->
                <div class="blog-log">
                    <h3 style="line-height: 40px">WdBly Blog</h3>
                    <span>懂事、有趣、保持理智</span>
                </div>
                <!-- 网站导航 -->
                <nav class="nav">
                    <router-link title="首页" to="/main/home" class="item">首页</router-link>
                    <router-link title="分类" to="/main/categories" class="item">分类</router-link>
                    <router-link title="归档" to="/main/archive/all/all" class="item">归档</router-link>
                    <router-link title="标签" to="/main/tags" class="item">标签</router-link>
                    <router-link title="资源" to="/main/sourceList" class="item">资源</router-link>
                </nav>

                <!-- 阅读排行榜top5 -->
                <TopList />

                <!-- 站点概览 style="position: sticky; top: 0px" -->
                <div class="overview">
                    <h2>站点概览</h2>
                    <!-- <img src="http://cdn.wddsss.com/image/article/5cbf514c3dc1bf12b864789f01bcd271.png?imageView2/1/w/0/h/0/q/50/webp" /> -->
                    <p class="name">周维 | Jim</p>
                    <!-- 懂事、有趣、保持理智 -->
                    <!-- 有些路只能一个人走 -->
                    <p class="signature" style="color: #363636">603927378@qq.com</p>

                    <!-- github, 个人网站, 等 -->
                    <div class="resouce">
                        <a title="github" href="https://github.com/WdBly" target="_blank">
                            <img src="http://cdn.wddsss.com/image/article/99a1c354794555c5c6aebec8cb8728dd.png?imageView2/1/w/200/h/200/q/100/webp" />
                            <span style="margin-left: 4px;">GitHub</span>
                        </a>
                    </div>

                    <!-- 友情链接 -->
                    <div class="links">
                        <p style="color: #363636; font-size: 18px">友情链接</p>
                        <a href="https://mo.fish" target="_blank">
                            鱼塘热榜
                        </a>
                        <a href="https://www.penlsun.cn" target="_blank">
                            西桥听雨
                        </a>
                        <a href="https://www.printf520.com" target="_blank">
                            Printf & 520
                        </a>
                        <a href="https://www.ohdata.top" target="_blank">
                            胡大大的个人博客
                        </a>
                    </div>
                </div>

                <FeedBack />

                <!-- 广告 -->
                <!-- <div style="margin-top: 20px">
                    <ins class="adsbygoogle"
                        style="display:inline-block;width:240px;height:200px"
                        data-ad-client="ca-pub-6933753629630360"
                        data-ad-slot="1605857454"></ins>
                </div> -->
            </div>
            <!-- 右侧其他路由 -->
            <div class="content-box">
                <router-view />
            </div>
        </div>
        <!-- 底栏 -->
        <footer class="footer">
            WdBly|周维 blog copyright-蜀ICP备18002409号-1
        </footer>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import TopList from "../components/TopList";
    import FeedBack from "../components/FeedBack";

    export default {
        name: "mainContent",
        data(){
            return {
                showNav: false,
                routerText:"首页",
                showHeader:false
            }
        },
        components: {
            TopList, FeedBack
        },
        computed:{
            ...mapGetters(["articleList"])
        },
        methods: {
        },
        mounted() {
            // 动态添加google广告
            var ads = document.querySelectorAll('.adsbygoogle');
            Object.keys(ads).forEach(() => {
                (adsbygoogle = window.adsbygoogle || []).push({});
            })
            // const browser = await puppeteer.launch({ignoreDefaultArgs: ["--enable-automation"]});
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
                max-width: 240px;
                width: 240px;
                margin-right: 24px;
            }

            .content-box {
                overflow: hidden;
                flex: 1;
            }

            .overview {
                display: flex;
                flex-direction: column;
                background: #fff;
                margin-top: 24px;
                padding: 12px;
                color: #767676;

                h2 {
                    font-size: 16px;
                    font-weight: bold;
                    color: #363636;
                    border-left: 4px solid #0090f0;
                    padding-left: 8px;
                    line-height: 22px;
                    height: 20px;
                    margin-bottom: 12px;
                    align-self: flex-start
                }

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
                        line-height: 30px;

                        &:hover {
                            color: #0090F0;
                        }

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
            background: #fff;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border-top: 1px solid #fff;
            color: #767676;
            margin-top: 24px;
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
            padding: 12px;

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


    // 横向广告 
    .toporheader { 
        width: 320px; height: 100px; 
    }
    @media(min-width: 480px) { .toporheader { width: 468px; height: 60px; } }
    @media(min-width: 768px) { .toporheader { width: 728px; height: 90px; } }
    @media(min-width:1200px) { .toporheader { width: 970px; height: 90px; } }

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