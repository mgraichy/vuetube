import { createRouter, createWebHistory } from 'vue-router';
import { authenticate } from '../composables/oauth2-config.js';

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


router.beforeEach(async (to, from) => {
    const check = (to.name === 'home' || to.name === 'cb');
    if (!authenticate() && !check) {
        // replace everything (works more robustly than e.g. "return  { name: 'home' };"):
        window.location.replace('/');
    }
});

export default router
