import { createRouter, createWebHistory } from "vue-router";

const routes = [ {
  path: '/auth',
  name: 'root',
  component: () => import(/* webpackChunkName: 'index' */ './../pages/Login.vue'),
},];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_ENV),
  routes,
});

export default router;
