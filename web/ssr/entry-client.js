import { createApp } from './app'

const { app } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}
// 绑定app根元素
window.onload = function() {
    app.$mount('#app')
}