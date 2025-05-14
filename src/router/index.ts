import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useUserStore } from '@/stores/user';
import Page from '@/views/Page.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { public: true },
    },
    {
      path: '/login',
      name: 'login',
      meta: { public: true },
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.loggedIn()) {
          next('/baseDash/overview');
        } else {
          next();
        }
      },
      component: () => import('../views/Login.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { public: true },
      beforeEnter: (to, from, next) => {
        const userStore = useUserStore();
        if (userStore.loggedIn()) {
          next('/baseDash/overview');
        } else {
          next();
        }
      },
      component: () => import('../views/Register.vue'),
    },
    {
      path: '/email-verification/:code',
      name: 'emailVerification',
      meta: { public: true },
      component: () => import('../views/EmailVerification.vue'),
    },
    {
      path: '/verify-your-email',
      name: 'verifyYourEmail',
      meta: { public: true },
      component: () => import('../views/VerifyYourEmail.vue'),
    },
    {
      path: '/baseDash',
      name: 'baseDash',
      component: () => import('../views/BaseDashLayout.vue'),
      meta: { public: false },
      children: [
        {
          path: 'bios',
          name: 'Bio list',
          meta: { public: false },
          component: () => import('../views/Logged_in/Bioslist.vue'),
        },
        {
          path: 'overview',
          name: 'Overview',
          meta: { public: false },
          component: () => import('../views/Logged_in/Overview.vue'),
        },
        {
          path: 'settings',
          name: 'Settings',
          meta: { public: false },
          component: () => import('../views/Logged_in/Settings.vue'),
          redirect: '/baseDash/settings/profile',
          children: [
            {
              path: 'profile',
              name: 'Profile',
              meta: { public: false },
              component: () => import('../views/Logged_in/Settings/Profile.vue'),
            },
            {
              path: 'account',
              name: 'Account',
              meta: { public: false },
              component: () => import('../views/Logged_in/Settings/Account.vue'),
            },
            {
              path: 'preferences',
              name: 'Preferences',
              meta: { public: false },
              component: () => import('../views/Logged_in/Settings/Preferences.vue'),
            },
          ],
        },
        {
          path: 'inbox',
          name: 'Inbox',
          meta: { public: false },
          component: () => import('../views/Logged_in/Inbox.vue'),
        },
        {
          path: 'editor/:handle',
          name: 'Editor',
          meta: { public: false },
          component: () => import('../views/Logged_in/Editor.vue'),
        },
        {
          path: 'admin',
          name: 'Admin',
          meta: { public: false, requiresAdmin: true },
          component: () => import('../views/Logged_in/Admin.vue'),
          redirect: '/baseDash/admin/adminUsers',
          children: [
            {
              path: 'adminUsers',
              name: 'Users',
              meta: { public: false, requiresAdmin: true },
              component: () => import('../views/Logged_in/Admin/Users.vue'),
            },
            {
              path: 'adminBios',
              name: 'Bios',
              meta: { public: false, requiresAdmin: true },
              component: () => import('../views/Logged_in/Admin/Bios.vue'),
            },
            {
              path: 'adminMail',
              name: 'Mail',
              meta: { public: false, requiresAdmin: true },
              component: () => import('../views/Logged_in/Admin/Mail.vue'),
            },
          ],
        },
        {
          path: ':pathMatch(.*)*',
          redirect: (to) => {
            const userStore = useUserStore();
            if (userStore.loggedIn()) {
              return '/baseDash/overview';
            } else {
              return '/login';
            }
          },
        },
      ],
    },
    {
      path: '/:handle',
      name: 'Page',
      meta: { public: true },
      component: Page,
    },
  ],
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();

  if (to.meta.public) {
    next();
    return;
  }

  if (!userStore.loggedIn()) {
    next('/login');
    return;
  }

  if (to.meta.requiresAdmin) {
    if (userStore.isAdmin()) {
      next();
    }
  } else {
    next();
  }
});

export default router;
