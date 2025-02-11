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
          path:'/biolist',
          name:'Bio list',
          component: ()=> import ('../views/Logged_in/Bioslist.vue'),
        },
        {
          path:'/overview',
          name:'Overview',
          component: ()=> import ('../views/Logged_in/Overview.vue'),
        },
        {
          path:'/settings',
          name:'Settings',
          component: ()=> import('../views/Logged_in/Settings.vue'),
          children:[
            {
              path:'/profile',
              name:'Profile',
              component: ()=> import('../views/Logged_in/Settings/Profile.vue')
            },
            {
              path:'/account',
              name:'Account',
              component: ()=> import('../views/Logged_in/Settings/Account.vue')
            },
            {
              path:'/preferences',
              name:'Preferences',
              component: ()=> import('../views/Logged_in/Settings/Preferences.vue')
            }
          ]
        }
      ]
    }
  ],
})

export default router
