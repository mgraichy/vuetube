import { createRouter, createWebHistory } from 'vue-router';
import { authenticate } from '../composables/oauth2-config.js';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomePage.vue'),//,HomeView,
        },
        {
            path: '/watch/:id',
            name: 'watch',
            component: () => import('../views/WatchPage.vue'),
        },
        {
            path: '/callback',
            name: 'cb',
            component: () => import('../views/CallbackPage.vue'),
        },
        {
            path: '/:path(.*)',
            name: 'NotFound',
            component: () => import('../views/NotFoundPage.vue'),
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
