<template>
    <div class="tags">
        <!-- 一共多少标签 -->
        <p class="total">共{{tags.length}}个标签</p>

        <div class="tag-content">
            <router-link class="tag-link" :class="[item.size === 'big' ? 'big' : item.size === 'medium' ? 'medium' : 'normal', 'tagsLink' + index]" :to="'/main/archive/tag/' + item.value" v-for="(item, index) in tags" :key="index">
                {{item.label}}
            </router-link>
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "tags",
        data(){
            return {
            }
        },
        asyncData ({ store, route }, emp, cookies) {
            cookies && store.dispatch("setCookie",cookies);
            return store.dispatch("getTags",{
                cookies
            })
        },
        computed:{
            ...mapGetters(["tags"])
        },
        methods:{
            getTags(){
                this.$store.dispatch("getTags", {});
            }
        },
        beforeMount(){
            let len = this.tags.length;
            if(!len){
                this.getTags()
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    .tags {
        padding: 32px 70px;
        background: #fff;
    }

    .total {
        margin-bottom: 12px;
        font-size: 18px;
        color: #767676;
    }

    .tag-content {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;

        .tag-link {
            text-decoration: none;
            margin: 18px 10px;
            padding: 6px 0;
            border-bottom: 1px dashed #a1a7be;

            &:hover {
                cursor: pointer;
                color: #0090F0;
            }

            &.big {
                font-size: 28px;
                font-weight: bold;
                color: #363636;
            }

            &.medium {
                font-size: 22px;
                font-weight: bold;
            }

            &.normal {
                color: #767676;
            }
        }
    }
</style>