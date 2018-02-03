<template>
    <div class="displayArticle">
        <mavon-editor style="display: none">
        </mavon-editor>
        <header class="header">

        </header>
        <div class="title">
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <h1 style="font-size: 40px">这是文章的标题</h1>
                <div style="margin-right: 40px">
                    <el-badge :value="200" :max="99" class="item" style="margin-right: 30px">
                        <el-button size="small">浏览</el-button>
                    </el-badge>
                    <el-badge :value="100" :max="10" class="item" >
                        <el-button size="small">赞</el-button>
                    </el-badge>
                </div>
            </div>
            <div style="margin-top: 15px;display: flex;justify-content: space-between">
                <div style="display: flex;align-items: center">
                    <span style="border-radius: 52%;background-color: yellow">原</span>
                    <span class="tags">javascript</span>
                    <span class="tags">javascript</span>
                    <span class="tags">javascript</span>
                    <span style="margin-left: 15px;color: #009A61;font-weight: bold;font-size: 18px">维大大</span>
                    <span style="margin-left: 15px;">2018-01-01 11:22:32</span>
                </div>
                <el-button size="small" type="text" style="margin-right: 45px">留言</el-button>
            </div>
        </div>
        <div class="content markdown-body" v-html="content"></div>
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
                content:''
            }
        },
        components: {
            'mavon-editor': mavonEditor.mavonEditor
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                console.log(vm.id);
                vm.$http.post("/article/getArticleContent",{
                    id:vm.id
                }).then((res)=>{
                    if (res.data.code === 200) {
                        vm.content = res.data.data.content;

                    }else{

                    }
                }).catch((err)=>{
                    console.log(err);
                })
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
            background-color: #017E66;
        }
    }
    .displayArticle {
        width: 1200px;
        margin: 0 auto;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.5);
    }
    .content{
        background-color: white;
        padding: 20px;
    }
    @media screen and (max-width: 1200px){
        .displayArticle {
            width: 90%;
        }
    }
</style>