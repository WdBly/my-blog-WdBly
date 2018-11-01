

import http from "./axios"

const allApi = {

    getArticleList(params){
        return http.post("/article/getArticleList",params);
    },

    getArticleClassList(){
        return http.get("/article/getArticleClass");
    },

    getArticleContent(params){
        return http.post("/article/getArticleContent",params);
    },

    getArticleTags(){
        return http.get("/article/getArticleTags");
    },

    userLogin(params){
        return http.post("/user/login",params);
    },

    userLogout(){
        return http.post("/user/logout");
    }

}


export default allApi