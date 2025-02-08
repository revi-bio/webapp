import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path:'/login',
      name:'login',
      component: ()=> import ('../views/Login.vue')
    },
    {
      path:'/register',
      name:'register',
      component: ()=> import ('../views/Register.vue')
    },
    {
      path:'/baseDash',
      name:'baseDash',
      component: ()=> import ('../views/BaseDashLayout.vue'),
      children:[
        {
          path:'/overview',
          name:'Overview',
          component: ()=> import ('../views/Logged_in/Overview.vue')
        }
      ]
    }
  ],
})

export default router
