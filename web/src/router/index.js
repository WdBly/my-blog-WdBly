
import Vue from 'vue';
import Router from 'vue-router';

function routerProduce() {
    const Main = ()=> import('@/components/Main.vue');
    const Home = ()=> import('@/components/Home.vue');
    const Login = ()=> import('@/components/Login.vue');
    const AboutMe = ()=> import('@/components/AboutMe.vue');
    const Register = ()=> import('@/components/Register.vue');
    const PersonalGrowth = ()=> import('@/components/personalGrowth.vue');
    const ShareContent = ()=> import('@/components/shareContent.vue');
    const FeedBack = ()=> import('@/components/feedBack.vue');
    const PublishArticles = ()=> import('@/components/publishArticles.vue');

    Vue.use(Router);

    const router = new Router({
        //mode: 'history',          //可以兼容IE
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

export default routerProduce();
