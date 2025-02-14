import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./../pages/login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('./../pages/Register.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashbaord',
    component: () => import('./../pages/Dashboard.vue'),
  },
  {
    path: '/newtask',
    name: 'newtask',
    component: () => import('./../pages/NewTask.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
