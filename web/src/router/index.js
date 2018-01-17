
import Vue from 'vue';
import Router from 'vue-router';

function routerProduce() {
    const Main = ()=> import('@/components/Main.vue');
    const Home = ()=> import('@/components/Home.vue');
    const Login = ()=> import('@/components/Login.vue');
    const Register = ()=> import('@/components/Register.vue');
    const AboutMe = ()=> import('@/components/AboutMe.vue');

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
