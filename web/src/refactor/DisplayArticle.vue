<template>
    <div class="displayArticle">
        <div class="content markdown-body" v-html="articleContent.content"></div>
        <!-- 底部显示分类， 标签， 最后更改时间 -->
        <div class="footer">
            <router-link :title="articleContent.class_name" :to="'/main/archive/class/' + articleContent.ca_id" style="margin-bottom: 12px">分类：{{articleContent.class_name}}</router-link>
            <router-link :title="item.label" :to="'/main/archive/tag/' + item.value" :key="key" v-for="(item, key) in tags" class="tag">
                #{{item.label}}
            </router-link>
            <span style="margin-top: 12px;">最后更新时间: {{articleContent.updated_at && articleContent.updated_at.substr(0, 10)}}</span>
        </div>
        <!-- 下一篇文章地址 -->
        <div class="next-artice" v-if="articleContent.next">
            <router-link :title="articleContent.next.title" class="next-artice-link" :to="'/main/displayArticle/' + articleContent.next.id">下一篇：{{articleContent.next.title}}</router-link>
        </div>
        <!-- 评论 -->
        <div class="article-comment">
            <!-- 评论框 -->
            <div style="padding-bottom: 24px;border-bottom: 1px solid #eee">
                <textarea maxlength="1200" v-model="articleComment" placeholder="留下你的评论..."></textarea>
                <div @click="submitComment" class="submit-comment-btn">提交</div>
            </div>

            <!-- 评论列表 -->
            <div class="comment-list">
                <h2>全部评论<span style="font-size: 14px; color: #767676; margin-left: 4px">{{commentList.length}}</span></h2>
                <div class="comment-item" v-for="(comment, index) in commentList" :key="comment.id">
                    <p>游客评论于: {{comment.created_at}} <span>{{commentList.length - index}}楼</span></p>
                    <div>{{comment.comment}}</div>
                </div>
                <div class="no-comment" v-if="!commentList.length">
                    暂时没有评论...
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import api from "../api"
    export default {
        props: ['id'],
        name: "display-article",
        data(){
            return{
                vue_env: process.env.VUE_ENV,
                commentList: [],
                articleComment: ""
            }
        },
        asyncData ({ store, route }, url, cookies) {
            var id = url.replace("/main/displayArticle/","");
            return store.dispatch("getArticleData",{ id: { id }, cookies })
        },
        computed:{
            ...mapGetters(["articleContent","tags"])
        },
        watch: {
            //监听相同路由下参数变化的时候，从而实现异步刷新
            '$route'() {
                this.commentList = [];
                this.getArticleData();
                this.getArticleComment();
                window.scrollTo(0, 0);
            }
        },
        methods:{
            submitComment() {
                if(!this.articleComment) {
                    alert("请输入评论");
                    return;
                }
                api.addArticleComment({articleId: parseInt(this.id), comment: this.articleComment}).then(rs => {
                    if(rs.data.code === 200) {
                        this.getArticleComment();
                    }
                });
            },
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
            },
            getArticleComment() {
                api.getArticleComment(parseInt(this.id)).then(rs => {
                    if(rs.data.code === 200) {
                        this.commentList = rs.data.data;
                    }
                })
            }
        },
        mounted () {
            if(!window.__INITIAL_STATE__){
                this.getArticleData();
            }
            this.commentList = [];
            this.getArticleComment();
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

    .article-comment {
        margin-top: 32px;
        padding: 24px;
        background: #fff;

        textarea {
            width: 100%;
            outline: none;
            border: 1px solid #eee;
            border-radius: 4px;
            height: 100px;
            padding: 10px;
            color: #363636;
            line-height: 20px;
            box-sizing: border-box;
            resize: none;
            background: #fafafa;

            &:focus {
                border-color: #0090F0;
            }
        }

        .submit-comment-btn {
            width: 74px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            background: #0090f0;
            border-radius: 2px;
            cursor: pointer;
            color: #fff;
            margin-top: 8px;

            &:hover {
                opacity: .8;
            }
        }

        .comment-list {
            margin-top: 24px;

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

            .comment-item {
                padding: 8px 0;
                margin: 10px 14px;
                font-size: 16px;
                color: #363636;
                line-height: 1.5;
                word-break: break-word;
                border-bottom: 1px solid #eee;

                p {
                    font-size: 14px;
                    color: #767676;
                    padding-bottom: 12px;

                    span {
                        margin-left: 12px;
                    }
                }
            }

            .no-comment {
                text-align: center;
                padding: 24px 0;
            }
        }
    }
</style>