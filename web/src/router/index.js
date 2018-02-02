
import Vue from 'vue';
import Router from 'vue-router';

function routerProduce() {
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


    const DisplayArticle = ()=> import('@/components/DisplayArticle.vue');


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
                    path: 'publishArticles',
                    component: PublishArticles
                },{
                    path: 'articleManagement',
                    component: ArticleManagement
                },{
                    path: 'userManagement',
                    component: UserManagement
                }]
            },
            {
                path: '/displayArticle/:id',
                component: DisplayArticle,
                props: true
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

export default routerProduce();
