<template>
    <div class="sourceList">
        <!-- 获取Key -->
        <div>
            <h3>获取key以使用以下接口</h3>
            <div>
                <div class="buttonClasss" @click="getApiKey">获取</div>
                <span class="apiKey">{{apiKey}}</span>
            </div>
        </div>

        <!-- 资源列表 -->
        <div class="sourceBox">
            <h3>可用资源列表</h3>
            <div v-for="(item, index) in archiveList" :key="index">
                <router-link
                    v-for="source in item.data" :key="source.title"
                    class="link-item"
                    :to="'/main/displayArticle/' + source.id"
                    :title="source.title"
                    target="_blank">
                    {{source.title}}
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'
    import api from "../api";

    export default {
        name: "sourceList",
        asyncData ({ store, route }, url, cookies) {
            // 这里面不能通过 this.props取到路由参数， 需要自己去匹配
            cookies && store.dispatch("setCookie",cookies);
            let obj = {
                pageNum: 1,
                pageSize: 10000,
                search: "",
                cookies,
                type_class: 52
            };
            return store.dispatch("getArchive", obj)
        },
        data() {
            return {
                apiKey: ""
            }
        },
        computed:{
            ...mapGetters(["archiveList", "total"])
        },
        methods:{
            getArchive(){
                let obj = {
                    pageNum: 1,
                    pageSize: 10000,
                    search: "",
                    type_class: 52
                }
                this.$store.dispatch("getArchive", obj);
            },
            getApiKey() {
                api.getTranslateKey().then(rs => {
                    if(rs.data.code === 200) {
                        this.apiKey = rs.data.data;
                    }
                })
            }
        },
        beforeMount(){
            let len = Object.keys(this.archiveList).length;
            if(!len){
                this.getArchive()
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .sourceList {
        padding: 32px;
        background: #fff;
    }

    .sourceBox {
        padding: 32px 0;
        margin: 32px 0;
        border-top: 2px dashed #eee;
    }

    .buttonClasss {
        width: 64px;
        border-radius: 4px;
        height: 30px;
        font-size: 16px;
        color: #42cbf2;
        background: #fff;
        text-align: center;
        line-height: 30px;
        margin: 20px 20px 0 0;
        display: inline-block;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px solid #42cbf2;

        &:hover {
            color: #fff;
            background: #42cbf2;
        }
    }

    .apiKey {
        font-size: 18px;
        font-weight: bold;
        color: #363636;
    }

    .link-item {
        padding: 2px 16px;
        border-radius: 4px;
        font-size: 16px;
        color: #fff;
        background: #42cbf2;
        text-decoration: none;
        text-align: center;
        line-height: 30px;
        margin: 20px 20px 0 0;
        display: inline-block;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px solid #42cbf2;

        &:hover {
            color: #42cbf2;
            background: #fff;
        }
    }
</style>