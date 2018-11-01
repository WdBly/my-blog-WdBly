

import http from "./axios"

const allApi = {

    getArticleList(params,cookies){
        return http.post("/article/getArticleList", params, null, cookies);
    },

    getArticleClassList(cookies){
        return http.get("/article/getArticleClass", null, cookies);
    },

    getArticleContent(params,cookies){
        return http.post("/article/getArticleContent",params, null, cookies);
    },

    getArticleTags(){
        return http.get("/article/getArticleTags", null, cookies);
    },

    userLogin(params){
        return http.post("/user/login",params);
    },

    userLogout(){
        return http.post("/user/logout", null, cookies);
    }

}


export default allApi