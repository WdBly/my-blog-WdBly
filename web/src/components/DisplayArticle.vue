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
                    <span style="border-radius: 52%;background-color: yellow">{{article.original === 0 ?"原":article.original === 1 ? "转" : "转"}}</span>
                    <span class="tags" :key="key" v-for="(item,key) in tags">{{item}}</span>
                    <span style="margin-left: 15px;color: #009A61;font-weight: bold;font-size: 18px">{{article.username}}</span>
                    <span style="margin-left: 15px;">更新时间:{{article.updated_at}}</span>
                </div>
                <el-button title="评论"  type="text" icon="el-icon-edit" style="margin-right: 45px"></el-button>
            </div>
        </div>
        <div class="content markdown-body" v-html="article.content"></div>
        <div class="footer">
            <span style="margin-left: 15px;">{{article.created_at}}</span>
        </div>
        <i class="el-icon-back jumpTop" @click="jumpTopFn"></i>
    </div>
</template>

<script>
    var mavonEditor = require('mavon-editor');
    import 'mavon-editor/dist/css/index.css'
    export default {
        props: ['id'],
        name: "display-article",
        data(){
            return{
                article:'',
                tags:[],
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
            }
        },
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$http.all([vm.$http.post("/article/getArticleContent",{
                    id:vm.id
                }), vm.$http.get("/article/getArticleTags")]).then(vm.$http.spread((res, res2)=>{
                    if (res.data.code === 200 && res2.data.code === 200){
                        vm.article = res.data.data;
                        vm.article.tags = JSON.parse(vm.article.tags);
                        vm.tags = [];
                        res2.data.data.forEach((val)=>{
                            if(vm.article.tags.indexOf(val.value)>-1){
                                vm.tags.push(val.label)
                            }
                        })
                    }else{
                        vm.$message.error(res.data.message+res2.data.message)
                    }
                }))
            })
        },
        updated(){
            document.querySelectorAll('img').forEach((item)=>{
                if(document.documentElement.clientWidth<1200){
                    item.style.maxWidth="75vw"
                }else{
                    item.style.maxWidth="1000px"
                }
            })
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