import { createRouter, createWebHistory } from 'vue-router'
import BaseComponent from '@/components/BaseComponent.vue'
import useUserStore from '@/stores/user.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: BaseComponent,
      beforeEnter: (to, from, next) => {
        const store = useUserStore();
        if(store.isLoggedIn) {
          next();
        }
        else {
          next('/login')
        }
      }
    },
    {
      name: 'login',
      path: '/login', component: () => import('@/views/login/LoginScreen.vue')
    },
  ],
})

export default router
