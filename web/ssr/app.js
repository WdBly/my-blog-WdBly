// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './../src/App.vue'
import router from './../src/router'
import createStore from './../src/store'
import { sync } from 'vuex-router-sync'


Vue.use(ElementUI);


// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例

export function createApp () {

    const store = createStore()

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    return { app, router, store }
}

