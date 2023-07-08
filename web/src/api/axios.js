import axios from "axios";

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    if(res.data.code !== 200){
        try{
            localStorage.clear();
        }catch(err) {
        }
    }
    return res;
}, function (err) {
    // 对响应错误做点什么
    return Promise.reject(err);
});


axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'https://api.wddsss.com';




export default {
    get:(url, origin, cookies) => {
        if(cookies && cookies["XSRF-TOKEN"] && cookies["laravel_session"]){
            let translateString = `XSRF-TOKEN=${cookies["XSRF-TOKEN"]};laravel_session=${cookies["laravel_session"]}`
            axios.defaults.headers['Cookie'] = translateString;
            axios.defaults.headers['X-XSRF-TOKEN'] = cookies["XSRF-TOKEN"];
        }
        return axios.get((origin || axios.defaults.baseURL) + url);
    },
    post:(url, params, origin, cookies) => {
        if(cookies && cookies["XSRF-TOKEN"] && cookies["laravel_session"]){
            let translateString = `XSRF-TOKEN=${cookies["XSRF-TOKEN"]};laravel_session=${cookies["laravel_session"]}`
            axios.defaults.headers['Cookie'] = translateString;
            axios.defaults.headers['X-XSRF-TOKEN'] = cookies["XSRF-TOKEN"];
        }
        return axios.post((origin || axios.defaults.baseURL) + url, params);
    },
    axios
}