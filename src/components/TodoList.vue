<template>
  <div
    style="
      max-width: 500px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    "
  >
    <h2 style="text-align: center">📋 Tus tareas</h2>

    <form @submit.prevent="add" style="display: flex; gap: 0.5rem; margin-bottom: 1rem">
      <input v-model="title" placeholder="Nueva tarea" style="flex: 1; padding: 0.5rem" />
      <button type="submit" style="padding: 0.5rem 1rem">Agregar</button>
    </form>

    <ul style="list-style: none; padding: 0">
      <li
        v-for="todo in todos"
        :key="todo._id"
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        "
      >
        <div style="display: flex; align-items: center; gap: 0.5rem">
          <input type="checkbox" :checked="todo.completed" @change="toggleComplete(todo)" />
          <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">
            {{ todo.title }} ({{ todo.username }})
          </span>
        </div>
        <button @click="remove(todo._id)" style="color: red; border: none; background: none">
          ❌
        </button>
      </li>
    </ul>

    <div style="text-align: center; margin-top: 1rem">
      <button @click="logoutAndGo" style="font-size: 0.9rem">Cerrar sesión</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getTodos, addTodo, deleteTodo, updateTodo } from '../services/todoService'
import { logout } from '../services/authService'
import { useRouter } from 'vue-router'

const todos = ref([])
const title = ref('')
const router = useRouter()

const token = localStorage.getItem('token') || sessionStorage.getItem('token')

// Redirigir si no hay token
if (!token) {
  router.push('/login')
}

const fetchTodos = async () => {
  const res = await getTodos()
  todos.value = res.data
}

const add = async () => {
  if (!title.value.trim()) return
  await addTodo(title.value)
  title.value = ''
  fetchTodos()
}

const remove = async (id) => {
  await deleteTodo(id)
  fetchTodos()
}

const toggleComplete = async (todo) => {
  await updateTodo(todo._id, {
    completed: !todo.completed,
    title: todo.title,
  })
  fetchTodos()
}

const logoutAndGo = () => {
  logout()
  router.push('/login')
}

onMounted(fetchTodos)
</script>
