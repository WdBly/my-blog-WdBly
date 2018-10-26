// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import actions from "./actions"
import mutations from "./mutations"

Vue.use(Vuex)

export default function createStore() {
    return new Vuex.Store({
        actions,
        modules: {
            mutations
        }
    })
}