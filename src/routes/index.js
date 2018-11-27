import Home from './../components/Home';
// import Login from './../components/Login';
import NotFound from './../components/NotFound';
import Children from './children';
import HomePage from './../pages/homePage';

const routes = [
    {
        path: '/',
        component: Home,
        children: Children,
        redirect: 'incomes'
    },
    // {
    //     path: '/login',
    //     component: Login,
    //     name: 'login'
    // },
    {
        path: '/access',
        component: Home,
        children: [
            {
                name: '首页',
                path: 'home',
                component: HomePage
            }, {
                path: '404',
                name: '404',
                component: NotFound
            }
        ]
    }, {
        path: '*',
        redirect: '/'
    }
];
export default routes;