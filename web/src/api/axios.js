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
axios.defaults.baseURL = 'http://112.74.34.178';




export default {
    get:(url) => {
        return axios.get(axios.defaults.baseURL+url);
    },
    post:(url,params) => {
        return axios.post(axios.defaults.baseURL+url,params);
    },
    axios
}