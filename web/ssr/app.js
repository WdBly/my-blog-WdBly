// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './../src/App.vue'
import createRouter from './../src/router'
import createStore from './../src/store'
import axios from './../src/api/axios'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI);


Vue.prototype.$http = axios;
Vue.prototype.BASEURL = 'http://api.wddsss.com';
Vue.prototype.ORIGIN = 'http://www.wddsss.com';
//Vue.prototype.ORIGIN = 'http://localhost:2500';

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例

export function createApp () {

    const router = createRouter()
    const store = createStore()

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    });

    return { app, router, store }
}

