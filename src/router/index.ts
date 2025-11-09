import { createRouter, createWebHistory } from 'vue-router'
import PrizesView from '../components/views/PrizesView.vue'
import LaureatsView from '../components/views/LaureatsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/prizes',
    },
    {
      path: '/prizes',
      name: 'prizes',
      component: PrizesView,
    },
    {
      path: '/laureats',
      name: 'laureats',
      component: LaureatsView,
    },
  ],
})

export default router