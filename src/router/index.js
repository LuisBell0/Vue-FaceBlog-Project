import { createRouter, createWebHistory } from 'vue-router'
import BaseComponent from '@/components/BaseComponent.vue'
import useUserStore from '@/stores/user.js'

const routes = [
  {
    name: 'home',
    path: '/',
    component: BaseComponent,
    meta: {requiresAuth: true},
  },
  {
    name: 'login',
    path: '/login', component: () => import('@/views/login/LoginScreen.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  if (!to.meta.requiresAuth) {
    next();
  }
  store.isLoggedIn = await store.checkAuth();
  if(!store.isLoggedIn) {
    next('/login');
  }
  next();
});

export default router
