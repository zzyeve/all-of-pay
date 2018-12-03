import Vue from 'vue';
import Router from 'vue-router';
import routes from './../routes';
import {Message} from 'element-ui';

Vue.use(Router);

const router = new Router({
    mode: 'hash',
    routes
});

router.beforeEach((to, from, next) => {
    let isLogin = window.sessionStorage.getItem('isLogin');
    next();
    if (to.meta.requireAuth) {
        if (isLogin === 'true') {
            if (to.path === '/login') {
                next('incomes');
            }
        } else {
            if (to.path !== '/login') {
                Message.warning('请先登录');
            }
            next('login');
        }
    } else {
        next();
    }
});

export default router;

