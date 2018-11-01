
import * as types from "./types"
import getters from "./getters"
import state from "./modules"

const mutations = {
    [types.SET_ARTICLE_LIST] (state, { list, total, articleClassList }) {
        state.articleList = list;
        state.total = total;
        state.articleClassList = articleClassList;
    },
    [types.SET_ARTICLE_CONTENT] (state, { articleContent, tags }) {
        state.articleContent = articleContent;
        state.tags = tags;
    },
    [types.SET_COOKIE] (state, cookie) {
        state.cookie = cookie;
    }
}

export default {
    state,
    mutations,
    getters
}