import { createRouter, createWebHashHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import Business from '../views/Business.vue'
import Staff from '../views/Staff.vue'
import Credit from '../views/Credit.vue'
import Admin from '../views/Admin.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: Landing
    },
    {
      path: '/business',
      name: 'business',
      component: Business
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/credit-review',
      name: 'credit',
      component: Credit
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    }
  ]
})

export default router
