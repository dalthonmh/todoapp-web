import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import TodoList from '../components/TodoList.vue'

const routes = [
  { path: '/', component: TodoList },
  { path: '/login', component: Login },
  { path: '/registro', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
