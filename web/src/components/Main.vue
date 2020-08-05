<template>
    <div id="mainContent">

        <div class="responseHead">
            <transition enter-active-class="animated zoomInLeft" leave-active-class="animated zoomOutUp">
                <div  v-show="showHeader" style="display: flex;justify-content: space-between;align-items: center;">
                    <p class="topTextP">WdBly&#8226;博客</p>
                    <el-button type="text" style="color: #437CD1" v-if="!cookie.username" @click="routerJump">
                        管理员登陆
                    </el-button>
                    <span v-else style="font-size: 20px;color: #a6e1ec">
                        {{cookie.username}} <span class="logOutSpan" @click="logout">退出</span>
                    </span>
                </div>
            </transition>
            <div class="eachItem">
                <div>
                    <router-link to="/main/home" class="item">首页</router-link>
                    <router-link to="/main/aboutMe" class="item" v-show="false">关于我</router-link>
                    <router-link to="/main/personalGrowth" class="item" v-show="false" >成长</router-link>
                    <router-link to="/main/shareContent" class="item" v-show="false">分享</router-link>
                    <router-link to="/main/feedBack" class="item" v-show="false">留言</router-link>
                    <router-link to="/main/publishArticles/0" class="item" v-show="!!cookie.username">发表文章</router-link>
                    <router-link to="/main/articleManagement" class="item" v-show="!!cookie.username">文章管理</router-link>
                    <router-link to="/main/userManagement" class="item" v-show="!!cookie.username">用户管理</router-link>
                </div>
                <span :class="showHeader?'el-icon-caret-top':'el-icon-caret-bottom'" @click="showHeader =!showHeader"></span>
            </div>
        </div>

        <div class="responseHeadMobile">
            <div class="head">
                <span>
                    WdBly&#8226;博客
                    <el-button type="text" v-show="!cookie.username" @click="routerJump" size="mini" style="margin: 0 0 0 5px">
                        管理员登陆
                    </el-button>
                    <span v-show="cookie.username" style="color: #a6e1ec">
                        {{cookie.username}}<span class="logOutSpan">退出</span>
                    </span>
                </span>
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button type="primary" size="mini">
                        {{routerText}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown" class="dropDownClass">
                        <el-dropdown-item command="/main/home-首页">首页</el-dropdown-item>
                        <el-dropdown-item command="/main/aboutMe-关于我" v-show="false">关于我</el-dropdown-item>
                        <el-dropdown-item command="/main/home-成长" v-show="false">成长</el-dropdown-item>
                        <el-dropdown-item command="/main/aboutMe-分享" v-show="false">分享</el-dropdown-item>
                        <el-dropdown-item command="/main/home-留言" v-show="false">留言</el-dropdown-item>
                        <el-dropdown-item command="/main/publishArticles/0-发表文章" v-show="!!cookie.username">发表文章</el-dropdown-item>
                        <el-dropdown-item command="/main/articleManagement-文章管理" v-show="!!cookie.username">文章管理</el-dropdown-item>
                        <el-dropdown-item command="/main/userManagement-用户管理" v-show="!!cookie.username">用户管理</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="content-body">
            <router-view/>
        </div>
        <i class="el-icon-back jumpTop" @click="jumpTopFn"></i>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        name: "mainContent",
        data(){
            return {
                routerText:"首页",
                showHeader:false,
                cookie: {
                    username: localStorage.getItem("username")
                }
            }
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
                                localStorage.clear();
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
        mounted(){

        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    #mainContent {
        height: 100vh;
        margin: 0 auto;
        background: #a2a8b3;

        .topTextP{
            color: white;
            font-size: 50px;
            letter-spacing: 3px;
            line-height: 100px;
        }
    }
    .content-body {
        width: 1200px;
        margin: 0 auto;
    }
    .eachItem{
        width: 1200px;
        margin: 0 auto;
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
    }
    .eachItem>span{
        font-size: 22px;
        color: white;
        cursor: pointer;
    }
    .jumpTop {
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 5px;
        color: white;
        font-size: 25px;
        font-weight: bold;
        transform: rotate(90deg);
        position: fixed;
        bottom: 50px;
        right: 5.8%;
        cursor: pointer;
        &:hover {
            background-color: #407bd4;
        }
    }
    .item {
        width: 100px;
        height: 50px;
        font-size: 17px;
        color: white;
        text-align: center;
        line-height: 50px;
        &:hover {
            color: #fff;
            text-decoration: none;
        }
    }
    .elCard {
        width: 100%;
        margin: 10px auto;
    }
    .responseHead{
        display: block;
        background-color: none;
        padding: 5px 20px;
    }
    .responseHeadMobile{
        display: none;
        background-color: #2a88bd;
        padding: 5px 20px;
    }
    .dropDownClass {
        display: none;
    }
    .router-link-active {
        color: #fff;
        border-bottom: 2px solid #fff;
    }
    .logOutSpan {
        color:white;
        font-size: 16px;
        margin-left: 10px;
        cursor: pointer;
        text-decoration: #2ab27b;
        &:hover {
            color: #98cbe8;
        }
    }
    @media screen and (max-width: 1200px){
        .eachItem {
            width: 80%;
        }
        .content-body {
            width: 80%;
        }
    }
    @media screen and (max-width: 700px){
        .eachItem {
            width: 98%;
        }
        .content-body {
            width: 98%;
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