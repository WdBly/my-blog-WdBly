
import Vue from 'vue';
import Router from 'vue-router';

export const createRouter = () => {
    // const Main = ()=> import('@/refactor/Main.vue');
    // const Home = ()=> import('@/refactor/Home.vue');
    const Main = ()=> import('@/components/Main.vue');
    const Home = ()=> import('@/components/Home.vue');
    const Login = ()=> import('@/components/Login.vue');
    const AboutMe = ()=> import('@/components/AboutMe.vue');
    const Register = ()=> import('@/components/Register.vue');
    const PersonalGrowth = ()=> import('@/components/PersonalGrowth.vue');
    const ShareContent = ()=> import('@/components/ShareContent.vue');
    const FeedBack = ()=> import('@/components/FeedBack.vue');
    const PublishArticles = ()=> import('@/components/PublishArticles.vue');
    const ArticleManagement = ()=> import('@/components/ArticleManagement.vue');
    const UserManagement = ()=> import('@/components/UserManagement.vue');


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
                redirect: '/main/home/1',
                children: [{
                    path: 'home/:page',
                    component: Home,
                    props: true
                },{
                    path: 'aboutMe',
                    component: AboutMe
                },{
                    path: 'personalGrowth',
                    component: PersonalGrowth
                },{
                    path: 'shareContent',
                    component: ShareContent
                },{
                    path: 'feedBack',
                    component: FeedBack
                },{
                    path: 'publishArticles/:id',
                    component: PublishArticles,
                    props: true
                },{
                    path: 'articleManagement',
                    component: ArticleManagement
                },{
                    path: 'userManagement',
                    component: UserManagement
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
                path: '/login',
                component: Login,
            },
            {
                path: '/register',
                component: Register,
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