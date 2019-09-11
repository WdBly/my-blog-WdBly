<template>
    <div class="categories">
        <!-- 一共多少分类 -->
        <p class="total">共{{articleClassList.length}}个分类</p>

        <div class="category-content">
            <router-link :title="item.label" class="category-link" :to="'/main/archive/class/' + item.value" v-for="(item, index) in articleClassList" :key="index">
                {{item.label}} ({{item.total}})
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "categories",
        data(){
            return {
            }
        },
        asyncData ({ store, route }, emp, cookies) {
            cookies && store.dispatch("setCookie",cookies);
            return store.dispatch("getCategory",{
                cookies
            })
        },
        computed:{
            ...mapGetters(["articleClassList"])
        },
        methods:{
            getCategory(){
                this.$store.dispatch("getCategory", {});
            }
        },
        beforeMount(){
            let len = this.articleClassList.length;
            if(!len){
                this.getCategory()
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .categories {
        padding: 32px 70px;
        background: #fff;
    }

    .total {
        margin-bottom: 12px;
        font-size: 18px;
        color: #767676;
    }

    .category-content {
        display: flex;
        flex-wrap: wrap;

        .category-link {
            text-decoration: none;
            width: 190px;
            line-height: 45px;

            &:hover {
                cursor: pointer;
                color: #0090F0;
            }
        }
    }
</style>