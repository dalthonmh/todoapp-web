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
    <h2 style="text-align: center">🔐 Iniciar Sesión</h2>

    <form @submit.prevent="submit" style="display: flex; flex-direction: column; gap: 0.5rem">
      <input v-model="username" placeholder="Usuario" required style="padding: 0.5rem" />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
        style="padding: 0.5rem"
      />
      <button type="submit" style="padding: 0.5rem">Entrar</button>
    </form>

    <div style="text-align: center; margin-top: 1rem">
      <router-link to="/registro">¿No tienes cuenta? Regístrate</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../services/authService'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

const submit = async () => {
  try {
    await login({ username: username.value, password: password.value })
    router.push('/')
  } catch (err) {
    alert(err.response.data.error || 'Error al inciar sesión')
  }
}
</script>
