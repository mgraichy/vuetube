import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CallbackPage from '../views/CallbackView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/watch/:id',
            name: 'watch',
            component: () => import('../views/WatchView.vue'),
        },
        {
            path: '/callback',
            name: 'cb',
            component: CallbackPage,//() => import('../views/CallbackView.vue'),
        },
        {
            path: '/:path(.*)',
            name: 'NotFound',
            component: () => import('../views/NotFoundView.vue'),
        },
    ],
})

export default router
