import { createRouter, createWebHistory } from "vue-router";

const routes = [ 
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: 'index' */ './../pages/Login.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: 'index' */ './../pages/Register.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashbaord',
    component: () => import(/* webpackChunkName: 'index' */ './../pages/Dashboard.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
