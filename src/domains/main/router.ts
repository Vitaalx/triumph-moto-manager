import type { RouteRecordRaw } from 'vue-router'

export default (): RouteRecordRaw[] => [
    {
        name: 'home',
        path: '/',
        component: () => import('./pages/HomePage.vue'),
    },
    {
        name: 'about',
        path: '/about',
        component: () => import('./pages/AboutPage.vue'),
    }
]

export const notFound = (): RouteRecordRaw => ({
    path: '/:notFoundPath(.*)*',
    component: () => import('@/layouts/BaseLayout.vue'),
    children: [
        {
            name: 'not-found',
            path: '/:notFoundPath(.*)*',
            component: () => import('./pages/NotFoundPage.vue'),
        },
    ],
})
