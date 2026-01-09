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
    <h2 style="text-align: center">Tasks</h2>

    <form @submit.prevent="add" style="display: flex; gap: 0.5rem; margin-bottom: 1rem">
      <input
        v-model="title"
        placeholder="New task"
        ref="taskRef"
        style="flex: 1; padding: 0.5rem"
      />
      <button type="submit" style="padding: 0.5rem 1rem">Add</button>
    </form>

    <div v-if="todos.length === 0" style="text-align: center; color: gray; margin: 1rem 0">
      No tasks assigned
    </div>
    <ul v-else style="list-style: none; padding: 0">
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
        <button
          @click="remove(todo._id)"
          style="background: none; color: gray; border: 1px solid #ccc; border-radius: 4px"
        >
          delete
        </button>
      </li>
    </ul>

    <div style="text-align: center; margin-top: 1rem">
      <button
        @click="logoutAndGo"
        style="
          font-size: 0.9rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.3rem 0.8rem;
        "
      >
        Logout
      </button>
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
const taskRef = ref(null)

onMounted(() => {
  taskRef.value.focus()
})

const token = localStorage.getItem('token') || sessionStorage.getItem('token')

// Redirect to login if not authenticated
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
  confirm('Are you sure to delete this task?') && (await deleteTodo(id))
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
