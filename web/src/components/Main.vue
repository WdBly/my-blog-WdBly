<template>
    <div id="mainContent">

            <div class="responseHead">
                <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutUp">
                    <div  v-show="showHeader" style="display: flex;justify-content: space-between;align-items: center;">
                        <p class="topTextP">WdBly&#8226博客</p>
                        <el-button type="primary" @click="routerJump">
                            管理员登陆
                        </el-button>
                    </div>
                </transition>
                <div class="eachItem">
                    <div>
                        <router-link to="home" class="item" >首页</router-link>
                        <router-link to="aboutMe" class="item" >关于我</router-link>
                        <router-link to="personalGrowth" class="item" >成长</router-link>
                        <router-link to="shareContent" class="item" >分享</router-link>
                        <router-link to="feedBack" class="item">留言</router-link>
                        <router-link to="publishArticles" class="item">发表文章</router-link>
                    </div>
                    <span :class="showHeader?'el-icon-caret-top':'el-icon-caret-bottom'" @click="showHeader =!showHeader"></span>
                </div>
            </div>


        <div class="responseHeadMobile">
            <div class="head">
                <span>
                    WdBly&#8226博客
                    <el-button type="success" @click="routerJump" size="mini" style="margin: 0 0 0 5px">
                        管理员登陆
                    </el-button>
                </span>
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button type="primary">
                        {{routerText}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="dropDownClass">
                        <el-dropdown-item command="home-首页">首页</el-dropdown-item>
                        <el-dropdown-item command="aboutMe-关于我">关于我</el-dropdown-item>
                        <el-dropdown-item command="home-成长">成长</el-dropdown-item>
                        <el-dropdown-item command="aboutMe-分享">分享</el-dropdown-item>
                        <el-dropdown-item command="home-留言">留言</el-dropdown-item>
                        <router-link to="publishArticles" class="item">发表文章</router-link>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "mainContent",
        data(){
            return{
                routerText:"首页",
                showHeader:true,
            }
        },
        methods:{
            handleCommand(key){
                this.$router.push({path:(key.split('-'))[0]});
                this.routerText = (key.split('-'))[1]
            },
            routerJump(){
                this.$router.push("/login")
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    #mainContent {
        width: 1200px;
        height: 100vh;
        margin: 0 auto;
        .topTextP{
            color: white;
            font-size: 50px;
            letter-spacing: 3px;
            line-height: 100px;
        }
    }
    .eachItem{
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .eachItem>div{
        height: 50px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border-bottom: 2px solid #E4EDE7;
    }
    .eachItem>span{
        font-size: 22px;
        color: white;
        cursor: pointer;
    }

    .item {
        width: 100px;
        height: 50px;
        font-size: 17px;
        color: white;
        text-align: center;
        line-height: 50px;
        &:hover {
            color: #F56C6C;
            text-decoration: none;
        }
    }
    .elCard {
        width: 100%;
        margin: 10px auto;
    }
    .responseHead{
        display: block;
    }
    .responseHeadMobile{
        display: none;
    }
    .dropDownClass {
        display: none;
    }
    .router-link-active {
        color: #F56C6C;
        border-bottom: 2px solid #F56C6C;
    }
    @media screen and (max-width: 1200px){
        #mainContent {
            width: 90%;
        }
    }
    @media screen and (max-width: 700px){
        #mainContent {
            width: 96%;
        }
        .responseHead{
            display: none;
        }
        .responseHeadMobile{
            display: block;
            div.head {
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    color: white;
                    font-size: 18px;
                    letter-spacing: 1px;
                    line-height: 50px;
                }
            }
        }
        .dropDownClass{
            display: block;
        }
    }
</style>