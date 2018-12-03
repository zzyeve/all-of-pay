import Home from './../components/Home';
// import Login from './../components/Login';
// import NotFound from './../components/NotFound';
import Children from './children';
// import HomePage from './../pages/homePage';
import Register from './../pages/register';
import Login from './../pages/login';

const routes = [
    {
        path: '/',
        component: Home,
        children: Children,
        redirect: 'incomes'
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    },
    {
        path: '/register',
        component: Register,
        name: 'register'
    },
    {
        path: '*',
        redirect: '/'
    }
];
export default routes;