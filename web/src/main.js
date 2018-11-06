// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import createRouter from './router'
import createStore from './store'
import axios from './api/axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Animate from 'animate.css'

Vue.use(ElementUI);

Vue.config.productionTip = false;

['success','error','info','warning'].forEach((item)=>{
    ElementUI.Message[item] = (options)=>{
        if (typeof options === 'string') {
            options = {
                showClose: true,
                message: options
            };
        }
        options.type = item;
        return ElementUI.Message(options);
    };
});

Vue.prototype.$http = axios;
Vue.prototype.BASEURL = 'https://api.wddsss.com';

const store = createStore()
const router = createRouter()

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
    data(){
        return {
            Event: new Vue()
        }
    }
});
