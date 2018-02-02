<template>
    <div class="displayArticle">
        <mavon-editor style="display: none">
        </mavon-editor>
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

<style scoped>
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