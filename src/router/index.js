import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import PhilView from '../views/PhilView.vue'
import NGOView from '../views/NGOView.vue'
import BlogView from '../views/BlogView.vue'
import UserUpdateView from '../views/UserUpdateView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/phil',
    name: 'phil',
    component: PhilView
  },
  {
    path: '/ngo',
    name: 'ngo',
    component: NGOView
  },
  {
    path: '/user',
    name: 'user',
    component: UserUpdateView
  },
  {
    path: '/blogs/:projId',
    name: 'blogs',
    component: BlogView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
