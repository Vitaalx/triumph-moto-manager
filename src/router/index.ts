import { createRouter, createWebHistory } from 'vue-router'
import main, { notFound } from '@/domains/main/router'
import auth from '@/domains/auth/router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL as string),
    routes: [
        {
            path: '/',
            component: () => import('../layouts/BaseLayout.vue'),
            children: [...main(), ...auth(), notFound()],
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router