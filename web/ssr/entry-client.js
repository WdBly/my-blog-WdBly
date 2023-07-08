import { createApp } from './app'

const {app, router, store} = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__);
}

//asyncData方法只能用于路由绑定的组件，如果是初始数据则可以直接在
// Vue.mixin({
//     beforeRouteUpdate (to, from, next) {
//         const { asyncData } = this.$options
//         if (asyncData) {
//             asyncData({
//                 store: this.$store,
//                 route: to
//             })
//             .then(next)
//             .catch(next)
//         } else {
//             next()
//         }
//     }
// })



//数据预取  不要再在页面中去取数据了
router.onReady(() => {
    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        // ????????????????? 同父不同子
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })
        if (!activated.length) {
            return next()
        }
        //这里如果有加载指示器(loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({store, route: to}, to.path)
            }
        })).then(() => {
            next()
        }).catch(next)
    })
    // 挂载vue实例
    app.$mount('#app')
})