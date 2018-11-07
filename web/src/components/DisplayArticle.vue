<template>
    <div class="displayArticle">
        <mavon-editor style="display: none">
        </mavon-editor>
        <header class="header">
            <router-link to="/main" class="el-icon-back"></router-link>
            <!--<router-link to="/main/publishArticles/0" class="el-icon-edit"></router-link>-->
        </header>
        <div class="title">
            <div style="display: flex;justify-content: space-between;align-items: center">
                <div style="display: flex;align-items: center;flex-wrap: wrap">
                    <span style="border-radius: 52%;background-color: yellow">{{articleContent.original === 0 ?"原":articleContent.original === 1 ? "转" : "转"}}</span>
                    <span class="tags" :key="key" v-for="(item,key) in tags">{{item}}</span>
                    <span style="margin-left: 15px;color: #009A61;font-weight: bold;font-size: 18px">{{articleContent.username}}</span>
                    <span style="margin-left: 15px;">更新时间:{{articleContent.updated_at}}</span>
                </div>
                <el-button title="评论"  type="text" icon="el-icon-edit" style="margin-right: 45px"></el-button>
            </div>
        </div>
        <div class="content markdown-body" v-html="articleContent.content"></div>
        <div class="footer">
            <span style="margin-left: 15px;">{{articleContent.created_at}}</span>
        </div>
        <i class="el-icon-back jumpTop" @click="jumpTopFn"></i>
    </div>
</template>

<script>
    if(process.env.VUE_ENV !== "server"){
        var mavonEditor = require('mavon-editor');
    } else {
        var ComponentA = {
            template: '<div></div>'
        };
    }
    
    import 'mavon-editor/dist/css/index.css'
    import { mapActions, mapGetters } from 'vuex'
    export default {
        props: ['id'],
        name: "display-article",
        data(){
            return{
                vue_env: process.env.VUE_ENV
            }
        },
        asyncData ({ store, route }, url, cookies) {
            var id = url.replace("/displayArticle/","");
            return store.dispatch("getArticleData",{ id: { id }, cookies })
        },
        computed:{
            ...mapGetters(["articleContent","tags"])
        },
        methods:{
            jumpTopFn(){
                if(process.env.VUE_ENV !== "server"){
                    let timer = setInterval(()=>{
                        if(document.documentElement.scrollTop<=0){
                            document.documentElement.scrollTop = 0;
                            clearInterval(timer);
                            return;
                        }
                        document.documentElement.scrollTop-=50;
                    },5)
                }
            },
            getArticleData(){
                this.$store.dispatch("getArticleData",{ id: { id: this.id }}).then(res => {
                    console.log(this.articleContent);
                    
                    this.loadding = false;
                    if(res[0].data.code !== 200 || res[1].data.code !== 200){
                        this.$message.error(res.data.message)
                    }
                })
            }
        },
        components: {
            'mavon-editor': process.env.VUE_ENV !== "server" ? mavonEditor.mavonEditor : ComponentA
        },
        beforeMount () {
            if(!window.__INITIAL_STATE__){
                this.getArticleData();
            }
        },
        updated(){
            if(process.env.VUE_ENV !== "server"){
                document.querySelectorAll('img').forEach((item)=>{
                    if(document.documentElement.clientWidth<1200){
                        item.style.maxWidth="75vw"
                    }else{
                        item.style.maxWidth="1000px"
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .header{
        width: 100%;
        height: 70px;
        background: url("../../static/images/loginBg.jpg");
        display: flex;
        justify-content: space-between;
        align-items: center;
        a{
            width: 50px;
            text-decoration:none;
            height: 100%;
            text-align: center;
            font-size: 25px;
            color: white;
            line-height: 70px;
            font-weight: bold;
            cursor: pointer;
            &:hover{
                color: #2ab27b;
            }
        }
    }
    .title{
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    .tags {
        background-color: #EBF5F3;
        height: 30px;
        line-height: 30px;
        display: block;
        padding: 0 8px;
        margin-left: 10px;
        cursor:pointer;
        &:hover{
            color: white;
            background-color: #017E66;
        }
    }
    .footer{
        height: 100px;
    }
    .displayArticle {
        width: 1200px;
        position: relative;
        margin: 0 auto;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.5);
    }
    .content{
        background-color: white;
        padding: 20px;
    }
    .jumpTop {
        display: block;
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border: 1px solid #333333;
        border-radius: 5px;
        background-color: #8c939d;
        color: white;
        font-size: 25px;
        font-weight: bold;
        transform: rotate(90deg);
        position: fixed;
        bottom: 50px;
        right: 5.8%;
        cursor: pointer;
        &:hover {
            background-color: #6f7180;
        }
    }
    @media screen and (max-width: 1200px){
        .displayArticle {
            width: 90%;
        }
    }
</style>