<template>
    <div class="top-list">
        <h2>推荐阅读</h2>
        <div class="list-item" v-for="(article) in topList" :key="article.id">
            <router-link :title="article.title" :to="'/main/displayArticle/' + article.id">{{article.title}}</router-link>
            <span class="read-num">阅读{{article.read_num}}</span>
        </div>
    </div>
</template>

<script>
    import api from "../api";
    export default {
        name: "top-list",
        data() {
            return {
                topList: []
            }
        },
        mounted(){
            api.getHomeArticleList({
                pageNum: 1, pageSize: 1000, search: ""
            }).then(rs => {
                if(rs.data.code === 200) {
                    this.topList = rs.data.data.list.sort((a, b) => b.read_num - a.read_num).slice(0, 5)
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .top-list {
        background: #fff;
        padding: 12px;
        margin-top: 20px;
        position: sticky;
        top: 0;
        z-index: 9;

        .list-item {
            border-bottom: 1px solid #eee;
            padding: 6px 0;
            line-height: 18px;
            cursor: pointer;

            a {
                text-decoration: none;
                color: #363636;
            }

            .read-num {
                display: block;
                margin-top: 4px;
                color: #767676;
                font-size: 12px;
            }

            &:hover {
                opacity: .8;
            }

            &:last-child {
                border: none
            }
        }

        h2 {
            font-size: 16px;
            font-weight: bold;
            border-left: 4px solid #0090f0;
            padding-left: 8px;
            line-height: 22px;
            height: 20px;
            margin-bottom: 8px;
        }
    }
</style>