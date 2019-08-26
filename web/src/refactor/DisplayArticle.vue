<template>
    <div class="displayArticle">
        <div class="content markdown-body" v-html="articleContent.content"></div>
        <!-- 底部显示分类， 标签， 最后更改时间 -->
        <div class="footer">
            <router-link :to="'/main/archive/class/' + articleContent.ca_id" style="margin-bottom: 12px">分类：{{articleContent.ca_id}}</router-link>
            <router-link :to="'/main/archive/tag/' + item.value" :key="key" v-for="(item, key) in tags" class="tag">
                #{{item.label}}
            </router-link>
            <span style="margin-top: 12px;">最后更新时间: {{articleContent.updated_at && articleContent.updated_at.substr(0, 10)}}</span>
        </div>
        <!-- 下一篇文章地址 -->
        <div class="next-artice">
            <router-link class="next-artice-link" :to="'/main/displayArticle/' + articleContent.nextArtice">{{articleContent.nextArtice || "探索新的React>"}}</router-link>
        </div>
    </div>
</template>

<script>
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
            var id = url.replace("/main/displayArticle/","");
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
                    this.loadding = false;
                    if(res[0].data.code !== 200 || res[1].data.code !== 200){
                        this.$message.error(res.data.message)
                    }
                })
            }
        },
        beforeMount () {
            if(!window.__INITIAL_STATE__){
                this.getArticleData();
            }
        },
        updated(){
            // if(process.env.VUE_ENV !== "server"){
            //     document.querySelectorAll('img').forEach((item)=>{
            //         if(document.documentElement.clientWidth<1200){
            //             item.style.maxWidth="75vw"
            //         }else{
            //             item.style.maxWidth="1000px"
            //         }
            //     })
            // }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .displayArticle {
        position: relative;
        margin: 0 auto;
    }
    .content{
        background-color: white;
        padding: 20px;
    }
    .footer {
        background: #fff;
        display: flex;
        flex-direction: column;
        padding: 24px;
        color: #363636;

        .tag {
            line-height: 30px;
        }
    }
    .next-artice {
        padding: 24px 24px 50px 24px;
        background: #fff;

        .next-artice-link  {
            border-top: 1px solid #eee;
            width: 100%;
            display: block;
            padding: 20px 0;
            color: #0090F0;
        }
    }
</style>