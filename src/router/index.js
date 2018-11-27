import Vue from 'vue';
import Router from 'vue-router';
import routes from './../routes';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes
});

router.beforeEach((to, from, next) => {
    const nextRoutes = ['incomes'];
    let isLogin = window.sessionStorage.getItem('isLogin');
    if (nextRoutes.indexOf(to.path) >= 0) {
        if (isLogin === 'false') {
            router.push({path: '/login'});
        }
    }
    if (to.name === 'login') {
        if (isLogin === 'true') {
            router.push({path: '/incomes'});
        }
    }
    next();
});

export default router;

