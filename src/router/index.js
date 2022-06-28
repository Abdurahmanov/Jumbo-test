import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'main',
            component: require('@/pages/Main').default,
        },
        {
            path: '/stores-by-city',
            name: 'city',
            component: require('@/pages/StoresByCity').default,
        },
        {
            path: '*',
            redirect: '/',
        },
    ],
});
