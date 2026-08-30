import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    /* {
      path: '/base',
      name: 'base',
      component: () => import('../views/BasePage.vue')
    } */

  ]
})

export default router
