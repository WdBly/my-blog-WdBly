// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
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

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    if(res.data.code !== 200){
        sessionStorage.clear();
    }
    return res;
}, function (err) {
    // 对响应错误做点什么
    return Promise.reject(err);
});


axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://112.74.34.178';
Vue.prototype.$http = axios;
Vue.prototype.BASEURL = 'http://112.74.34.178';

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
