
import * as types from "./types"
import getters from "./getters"
import state from "./modules"

const mutations = {
    [types.SET_ARTICLE_LIST] (state, { list, total }) {
        state.articleList = list;
        state.total = total;
    }
}

export default {
    state,
    mutations,
    getters
}