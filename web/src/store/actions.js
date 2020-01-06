
import * as types from './types'
import api from "./../api"

export default {
    getHomeData({ commit }, params){
        var {pageNum,pageSize,search} = params;
        return Promise.all([api.getHomeArticleList({pageNum,pageSize,search}), api.getArticleClassList()]).then(res => {
            if(res[0].data.code === 200 && res[1].data.code === 200) {
                commit(types.SET_ARTICLE_LIST, {
                    list: res[0].data.data.list,
                    total: res[0].data.data.total,
                    articleClassList: res[1].data.data
                })
            }

            return res;
        })
    },
    getCategory({ commit }, params){
        return api.getArticleClassList(params.cookies).then(res => {
            if(res.data.code === 200) {
                commit(types.SET_CATEGORY, {
                    articleClassList: res.data.data,
                })
            }

            return res;
        })
    },
    getTags({ commit }, params){
        return api.getArticleTags(params.cookies).then(res => {
            if(res.data.code === 200) {
                commit(types.SET_TAGS, {
                    tags: res.data.data.map(tag => {
                        if(tag.total > 3){
                            tag.size = "big"
                        }else if(tag.total > 1 && tag.total <= 3) {
                            tag.size = "medium";
                        }else {
                            tag.size = "normal"
                        }

                        return tag;
                    }),
                })
            }

            return res;
        })
    },
    getArchive({ commit }, params){
        var {pageNum,pageSize,search,type_class,type_tag} = params;
        return api.getHomeArticleList({pageNum,pageSize,search,type_class,type_tag}, params.cookies).then(res => {
            var archive = {};
            var time;
            if(res.data.code === 200) {
                res.data.data.list.forEach(list => {
                    time = list.created_at.substr(0, 4);
                    if(archive[time]){
                        archive[time].push({
                            title: list.title,
                            month: list.created_at.substring(5, 10),
                            id: list.id
                        })
                    }else {
                        archive[time] = [{
                            title: list.title,
                            month: list.created_at.substring(5, 10),
                            id: list.id
                        }];
                    }
                })

                commit(types.SET_ARCHIVE, {
                    archiveList: Object.keys(archive).reverse().map(key => ({
                        title: key,
                        data: archive[key]
                    })),
                    total: res.data.data.total
                })
            }

            return archive;
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
                        tags.push({
                            label: val.label,
                            id: val.value
                        })
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
    },
    setHomeData({ commit }, data){
        commit(types.SET_ARTICLE_LIST, data)
    }
}