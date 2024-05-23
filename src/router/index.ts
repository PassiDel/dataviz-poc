import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER === 'hash'
      ? createWebHashHistory(import.meta.env.BASE_URL)
      : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('../views/CompareDegreesView.vue')
    },
    {
      path: '/faculty',
      name: 'faculty',
      component: () => import('../views/CompareFacultiesView.vue')
    },
    {
      path: '/university',
      name: 'university',
      component: () => import('../views/UniView.vue')
    }
  ]
});

export default router;
