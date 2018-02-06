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

axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://101.200.61.216';
Vue.prototype.$http = axios;
Vue.prototype.BASEURL = 'http://101.200.61.216';

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
