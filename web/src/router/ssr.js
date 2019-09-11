import Vue from 'vue';
import Router from 'vue-router';

export const createSsrRouter = () => {
    const Main = ()=> import('@/refactor/Main.vue');
    const Home = ()=> import('@/refactor/Home.vue');
    const DisplayArticle = ()=> import('@/refactor/DisplayArticle.vue');
    const ArchiveComponent = ()=> import('@/refactor/ArchiveComponent.vue');
    const Categories = ()=> import('@/refactor/Categories.vue');
    const Tags = ()=> import('@/refactor/Tags.vue');
    const SourceList = ()=> import('@/refactor/SourceList.vue');


    Vue.use(Router);

    const router = new Router({
        mode: 'history',          //可以兼容IE
        routes: [
            {
                path: '/main',
                component: Main,
                redirect: '/main/home',
                children: [{
                    path: 'home',
                    component: Home
                },{
                    path: 'displayArticle/:id',
                    component: DisplayArticle,
                    props: true
                },{
                    path: 'archive/:type/:value',
                    component: ArchiveComponent,
                    props: true
                },{
                    path: 'categories',
                    component: Categories
                },{
                    path: 'tags',
                    component: Tags
                },{
                    path: 'sourceList',
                    component: SourceList
                }]
            },
            {
                path: '/',
                redirect: '/main'
            },
            {
                path: '*',
                redirect: '/main'
            }
        ]
    });

    return router;
}