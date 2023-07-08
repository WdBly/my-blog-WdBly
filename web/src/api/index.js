

import http from "./axios"

const allApi = {

    getArticleList(params, cookies){
        return http.post("/article/getArticleList", params, null, cookies);
    },

    getHomeArticleList(params,cookies){
        return http.post("/article/getHomeArticleList", params, null, cookies);
    },

    getArticleClassList(cookies){
        return http.post("/article/getArticleClass", {}, null, cookies);
    },

    getArticleContent(params,cookies){
        return http.post("/article/getArticleContent",params, null, cookies);
    },

    getArticleTags(cookies){
        return http.get("/article/getArticleTags", null, cookies);
    },

    userLogin(params){
        return http.post("/user/login",params);
    },

    userLogout(){
        return http.post("/user/logout", null);
    },

    getTranslateKey() {
        return http.get("/api/getKey", null);
    },

    translation(key) {
        return http.post("/api/validateKey", {key});
    },

    addFeedback({email, feedback}) {
        return http.post("/article/feedback", {email, feedback});
    },

    addArticleComment(params) {
        return http.post("/article/addArticleComment", params);
    },

    getArticleComment(id) {
        return http.post("/article/getArticleComment", {id});
    }
}


export default allApi