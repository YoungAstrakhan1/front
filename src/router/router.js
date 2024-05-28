import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main.vue';
import Register  from '@/components/Register.vue'
import Login  from '@/components/Login.vue';
import Orders  from '@/components/Orders.vue';
import OrderForm  from '@/components/OrderForm.vue';
import AdminPanel  from '@/components/AdminPanel.vue';
import AdminLogin  from '@/components/AdminLogin.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/orders', component: Orders },
  { path: '/new-order', component: OrderForm },
  { path: '/admin-login', component: AdminLogin },
  { path: '/admin-panel', component: AdminPanel },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
