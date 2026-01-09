<template>
  <div
    style="
      max-width: 400px;
      margin: 2rem auto;
      padding: 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
    "
  >
    <h2 style="text-align: center">Register</h2>

    <form @submit.prevent="submit" style="display: flex; flex-direction: column; gap: 0.5rem">
      <input
        v-model="username"
        placeholder="Username"
        ref="usernameRef"
        required
        style="padding: 0.5rem"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        style="padding: 0.5rem"
      />
      <button type="submit" style="padding: 0.5rem">Register</button>
    </form>

    <div style="text-align: center; margin-top: 1rem">
      <router-link to="/login">Already have an account? Log In</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { register } from '../services/authService'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const username = ref('')
const password = ref('')
const router = useRouter()
const usernameRef = ref(null)

onMounted(() => {
  usernameRef.value.focus()
})

const submit = async () => {
  try {
    await register({ username: username.value, password: password.value })
    router.push('/login')
  } catch (err) {
    alert(err.response.data?.error || 'Error al registrarse')
  }
}
</script>
