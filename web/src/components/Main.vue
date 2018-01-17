<template>
    <div id="mainContent">
        <div class="responseHead">
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <p class="topTextP">WdBly&#8226博客</p>
                <el-button type="primary">管理员登陆</el-button>
            </div>
            <div class="eachItem">
                <router-link to="home" class="item" >首页</router-link>
                <router-link to="aboutMe" class="item" >关于我</router-link>
                <router-link to="home" class="item" >成长</router-link>
                <router-link to="aboutMe" class="item" >分享</router-link>
                <router-link to="home" class="item">留言</router-link>
            </div>
            <el-card class="box-card elCard">
                <router-view/>
            </el-card>
        </div>
        <div class="responseHeadMobile">
            <div class="head">
                <span>
                    WdBly&#8226博客
                    <el-button type="success" size="mini" style="margin: 0 0 0 5px">
                        <router-link to="/login">管理员登陆</router-link>
                    </el-button>
                </span>
                <el-dropdown trigger="click" @command="handleCommand">
                    <el-button type="primary">
                        {{routerText}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="home-首页">首页</el-dropdown-item>
                        <el-dropdown-item command="aboutMe-关于我">关于我</el-dropdown-item>
                        <el-dropdown-item command="home-成长">成长</el-dropdown-item>
                        <el-dropdown-item command="aboutMe-分享">分享</el-dropdown-item>
                        <el-dropdown-item command="home-留言">留言</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mainContent",
        data(){
            return{
                routerText:"首页",
            }
        },
        methods:{
            handleCommand(key){
                this.$router.push({path:(key.split('-'))[0]});
                this.routerText = (key.split('-'))[1]
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
    .eachItem {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        border-bottom: 2px solid #E4EDE7;
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
        margin: 10px auto
    }
    .responseHead{
        display: block;
    }
    .responseHeadMobile{
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
    }
</style>