import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Home/Home.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login/Login.vue'),
      meta: {
        redirectLogin: true
      }
    },
    {
      path: '/column/:id',
      name: 'column',
      component: () => import('../components/Column/Column.vue'),
      meta: {
        requireLogin: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register/Register.vue'),
      meta: {
        redirectLogin: true
      }
    },
    {
      path: '/create',
      name: 'create',
      component: () => import('../components/CreatePost/CreatePost.vue'),
      meta: {
        requireLogin: true
      }
    }
  ]
})

router.beforeEach((to, form, next) => {
  if (to.meta.requireLogin && !store.state.user.isLogin) {
    next({ name: 'login' })
  } else if (to.meta.redirectLogin && store.state.user.isLogin) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router