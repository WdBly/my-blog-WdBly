
import * as types from './types'
import api from "./../api"

export default {
    getArticleList({ commit }, params){
        return api.getArticleList(params).then(res => {
            if(res.data.code === 200){
                commit(types.SET_ARTICLE_LIST, {
                    list:res.data.data.list,
                    total: res.data.data.total
                })
                return res;
            }

            return res;
        })
    }
}