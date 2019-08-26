<template>
    <div class="homeContent">
        <!-- 文章列表 -->
        <article class="single-article" v-for="article in articleList" :key="article.id">
            <!-- 文章标题 -->
            <router-link class="article-title" :to="'/main/displayArticle/' + article.id" target="_blank">{{article.title}}</router-link>
            <!-- 发表时间 | 分类 | 阅读次数 -->
            <div class="article-info">
                <span class="info-item">发表于{{article.created_at.substr(0, 10)}}</span>
                <router-link :to="'/main/archive/class/' + article.ca_id" class="info-item" style="color: #0090F0">{{article.class_name || "React Native"}}</router-link>
                <span class="info-item">阅读{{article.read_num}}</span>
            </div>
            <img class="everArticleImg" src="http://cdn.wddsss.com/image/article/6b4f1ff2ecbe448d15daeefc715a5737.png?imageView2/1/w/616/h/350/q/50/webp"/>
            <p class="article-desc">{{article.description}}</p>
            <router-link class="read-all" :to="'/main/displayArticle/' + article.id">
                阅读全文>>
            </router-link>
        </article>
    </div>
</template>

<script type="text/ecmascript-6">

    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "home",
        data(){
            return {
                select:'',
                curr_value: '',
                topSearchContent: '',
                pageNum: 1,
                pageSize: 10000,
                loadding: false,
                dynamicSpace: 260
            }
        },
        asyncData ({ store, route }, emp, cookies) {
            cookies && store.dispatch("setCookie",cookies);
            return store.dispatch("getHomeData",{
                pageNum: 1,
                pageSize: 10000,
                search: "",
                cookies
            })
        },
        computed:{
            ...mapGetters(["articleList","total","articleClassList"])
        },
        methods:{
            imageFilter(src) {
                src += "?imageView2/1/w/200/h/140/q/65/webp";
                return src;
            },
            handleCurrentChange() {
                this.getArticleList();
            },
            readFullArticle(id){
                this.$router.push({ path: `/displayArticle/${id}` })
            },
            searchArticleList(){
                this.getArticleList();
            },
            getArticleList(){
                this.loadding = true;
                this.$http.post("/article/getHomeArticleList",{
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    search: this.topSearchContent
                }).then((res)=>{
                    this.loadding = false;
                    if(res.data.code === 200){
                        this.articleList=res.data.data.list;
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            },
            getHomeData(){
                this.$store.dispatch("getHomeData",{
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    search: this.topSearchContent
                }).then(res => {
                    this.loadding = false;
                    if(res[0].data.code !== 200 || res[1].data.code !== 200){
                        this.$message.error(res.data.message)
                    }
                })
            }
        },
        beforeMount(){
            if(!this.articleList.length){
                this.loadding = true;
                this.getHomeData()
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .homeContent{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #fff;


        .single-article {
            padding: 70px 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-bottom: 1px dashed #b5ada2;

            &:last-child {
                border-bottom: none;
            }

            .article-title {
                font-size: 22px;
                color: #696060;
                margin-bottom: 14px;
            }

            .article-info {
                color: #767676;
                margin-bottom: 30px;
            }

            .info-item {
                padding: 0 6px;
                border-right: 1px solid #b5ada2;

                &:last-child {
                    border: none;
                }
            }

            img {
                width: 100%;
                margin-bottom: 20px;
            }

            .article-desc {
                width: 100%;
                text-align: left;
                color: #363636;
                margin-bottom: 40px;
            }

            .read-all {
                margin: 0;
                padding: 0;
                border: 2px solid b5ada2;  //自定义边框
                border-radius: 2px;
                background: #eee;
                padding: 5px 20px;
                cursor: pointer;
                text-decoration: none;
                
                &:hover {
                    background: #a1a7be;
                    color: #fff;
                }
            }
        }
    }
</style>