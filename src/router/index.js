import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/**
 * @module router
 * @description The Vue router.
 */
export default new Router({
    /**
     * The routes.
     * @property {Array} routes
     * @property {object} routes.main The main route.
     * @property {string} routes.main.path The path.
     * @property {string} routes.main.name The name.
     * @property {object} routes.main.component The component.
     * @property {object} routes.city The city route.
     * @property {string} routes.city.path The path.
     * @property {string} routes.city.name The name.
     * @property {object} routes.city.component The component.
     * @property {object} routes.redirect The redirect route.
     * @property {string} routes.redirect.path The path.
     * @property {string} routes.redirect.redirect The redirect path.
     */
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
