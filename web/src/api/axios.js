import axios from "axios";

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
axios.defaults.baseURL = 'http://api.wddsss.com';




export default {
    get:(url, origin) => {
        return axios.get((origin || axios.defaults.baseURL) + url);
    },
    post:(url, params, origin) => {
        return axios.post((origin || axios.defaults.baseURL) + url, params);
    },
    axios
}