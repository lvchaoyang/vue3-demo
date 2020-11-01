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
    const { user, token } = store.state
    const { requiredLogin, redirectAlreadyLogin } = to.meta;
    if (!user.isLogin) { // 用户未登录完成
        if (token) { // 获取了token但是还未获取用户信息
            store.dispatch('fetchCurrentUser').then(() => {
              if (redirectAlreadyLogin) { // 登录页
                next('/')
              } else {
                next()
              }
            }).catch(e => { // 获取用户信息异常
              console.error(e)
              store.commit('logout')
              next('login')
            })
        } else { // 没有token
            if (requiredLogin) {
                next('login')
            } else {
                next()
            }
        }
    } else { // 用户登录完成
        if (redirectAlreadyLogin) { // 登录页的化跳转首页
            next('/')
        } else {
            next()
        }
    }
})


export default router