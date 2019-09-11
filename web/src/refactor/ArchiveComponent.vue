<template>
    <div class="crchive">
        <!-- 一共多少文章 -->
        <p class="total">共{{total}}篇</p>

        <div class="year" v-for="(item, index) in archiveList" :key="index">
            <!-- year -->
            <div class="year-title">
                <span>{{item.title}}</span>
                <div class="dot" />
            </div>
            <!-- month -->
            <div class="month" v-for="month in item.data" :key="month.title">
                <router-link :title="month.title" class="month-title" :to="'/main/displayArticle/' + month.id" target="_blank">
                    <em>{{month.month}}</em> &nbsp;{{month.title}}
                </router-link>
                <div class="dot" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        props: ['type', 'value'],
        name: "archive",
        data(){
            return {
            }
        },
        asyncData ({ store, route }, url, cookies) {
            // 这里面不能通过 this.props取到路由参数， 需要自己去匹配
            cookies && store.dispatch("setCookie",cookies);
            let obj = {
                pageNum: 1,
                pageSize: 10000,
                search: "",
                cookies
            };

            /main\/archive\/(\w+)\/(\w+)/.test(url);
            let type = RegExp.$1;
            let value = RegExp.$2;
            if(type === "tag"){
                obj.type_tag = value;
            }
            if(type === "class"){
                obj.type_class = value;
            }
            return store.dispatch("getArchive", obj)
        },
        computed:{
            ...mapGetters(["archiveList", "total"])
        },
        methods:{
            getArchive(){
                let obj = {
                    pageNum: 1,
                    pageSize: 10000,
                    search: ""
                }
                if(this.type === "tag"){
                    obj.type_tag = this.value;
                }
                if(this.type === "class"){
                    obj.type_class = this.value;
                }
                this.$store.dispatch("getArchive", obj);
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
    .crchive {
        padding: 32px 70px;
        background: #fff;
    }

    .total {
        margin-bottom: 32px;
        font-size: 18px;
        color: #767676;
    }
    
    .year {
        border-left: 2px solid #d9dce8;
        padding-bottom: 65px;

        &:last-child {
            padding-bottom: 20px;
        }
    }

    .year-title {
        position: relative;
        height: 65px;
        font-size: 20px;
        color: #363636;
        font-weight: bold;
        padding: 0 16px;

        span {
            position: relative;
            top: -8px;
        }
        
        .dot {
            position: absolute;
            width: 10px;
            height: 10px;
            background: #cecfd4;
            border-radius: 50%;
            left: -6px;
            top: 0px;
        }
    }
    .month {
        padding: 0 0 8px 16px;
        border-bottom: 1px dashed #928f8f;
        margin-bottom: 34px;
        position: relative;

        &:last-child {
            margin-bottom: 0;
        }

        .dot {
            position: absolute;
            width: 6px;
            height: 6px;
            background: #cecfd4;
            border-radius: 50%;
            left: -4px;
            top: 7px;
        }

        .month-title {
            text-decoration: none;
            display: block;
            width: 100%;
            
            em {
                color: #363636;
                font-weight: bold;
            }

            &:hover {
                cursor: pointer;
                color: #0090F0;

                em {
                    color: #0090F0;
                }
            }
        }
    }

    @media screen and (max-width: 990px){
        .crchive {
            padding: 32px 26px;
        }
    }
</style>