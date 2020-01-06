
import * as types from "./types"
import getters from "./getters"
import state from "./modules"

const mutations = {
    [types.SET_ARTICLE_LIST] (state, { list, total, articleClassList, allPage }) {
        state.articleList = list;
        state.total = total;
        state.articleClassList = articleClassList;
        allPage && (state.allPage = allPage);
    },
    [types.SET_ARTICLE_CONTENT] (state, { articleContent, tags }) {
        state.articleContent = articleContent;
        state.tags = tags;
    },
    [types.SET_COOKIE] (state, cookie) {
        state.cookie = cookie;
    },
    [types.SET_ARCHIVE] (state, { archiveList, total }) {
        state.archiveList = archiveList;
        state.total = total;
    },
    [types.SET_CATEGORY] (state, { articleClassList }) {
        state.articleClassList = articleClassList;
    },
    [types.SET_TAGS] (state, { tags }) {
        state.tags = tags;
    }
}

export default {
    state,
    mutations,
    getters
}