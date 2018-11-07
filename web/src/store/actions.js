
import * as types from './types'
import api from "./../api"

export default {
    getHomeData({ commit }, params){
        var {pageNum,pageSize,search} = params;
        return Promise.all([api.getArticleList({pageNum,pageSize,search}, params.cookies),api.getArticleClassList(params.cookies)]).then(res => {
            if(res[0].data.code === 200 && res[1].data.code === 200){
                commit(types.SET_ARTICLE_LIST, {
                    list: res[0].data.data.list,
                    total: res[0].data.data.total,
                    articleClassList: res[1].data.data,
                })
            }

            return res;
        })
    },
    getArticleData({ commit }, params){
        return Promise.all([api.getArticleContent(params.id, params.cookies),api.getArticleTags(params.cookies)]).then(res => {
            if(res[0].data.code === 200 && res[1].data.code === 200){
                var article = res[0].data.data;
                article.value = "";
                article.tags = JSON.parse(article.tags);
                var tags = [];
                res[1].data.data.forEach((val)=>{
                    if(article.tags.indexOf(val.value)>-1){
                        tags.push(val.label)
                    }
                })
                
                commit(types.SET_ARTICLE_CONTENT, {
                    articleContent: article,
                    tags: tags
                })
            }

            return res;
        })
    },
    setCookie({ commit }, cookie){
        commit(types.SET_COOKIE, cookie)
    }
}