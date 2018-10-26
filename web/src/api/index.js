

import http from "./axios"

const allApi = {

    getArticleList(params){
        return http.post("/article/getArticleList",params)
    }

}


export default allApi