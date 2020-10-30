import { createRouter, createWebHistory } from "vue-router";
import store from './store'
const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: {
                name: 'home-page'
            }
        },
        {
            path: '/home',
            name: 'home-page',
            component: () => import('@/views/home-page.vue')
        },
        {
            path: '/login',
            name: 'login-page',
            component: () => import('@/views/login-page.vue'),
            meta: { redirectAlreadyLogin: true }
        },
        {
            path: '/create',
            name: 'create-post-page',
            component: () => import('@/views/create-post-page.vue'),
            meta: { requiredLogin: true }
        },
        {
            path: '/column/:id',
            name: 'column-detail-page',
            component: () => import('@/views/column-datail-page.vue'),
            meta: { requiredLogin: true }
        }
    ]
})


router.beforeEach((to, from, next) => {
    const { user } = store.state
    const { requiredLogin, redirectAlreadyLogin } = to.meta;
    if (requiredLogin && !user.isLogin) {
        next('login')
    } else if (redirectAlreadyLogin && user.isLogin) {
        next('/')
    } else {
        next()
    }
})


export default router