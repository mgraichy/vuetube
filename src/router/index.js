import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),//,HomeView,
        },
        {
            path: '/watch/:id',
            name: 'watch',
            component: () => import('../views/WatchView.vue'),
        },
        {
            path: '/callback',
            name: 'cb',
            component: () => import('../views/CallbackView.vue'),
        },
        {
            path: '/:path(.*)',
            name: 'NotFound',
            component: () => import('../views/NotFoundView.vue'),
        },
    ],
})

export default router
