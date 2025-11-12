<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'
import type { ErrorResponse } from '@/types'

const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

// Login function
const login = async () => {
  error.value = ''
  loading.value = true

  // Call login API
  try {
    const res = await api.post<{ token: string }>('/login', {
      email: email.value,
      password: password.value,
    })

    // Save token and redirect to profile
    localStorage.setItem('token', res.data.token)
    router.push('/profile')
  } catch (err: unknown) {
    const e = err as ErrorResponse
    error.value = e.response?.data?.message || 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login">
    <form @submit.prevent="login" class="login-form">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Login' }}
      </button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.login {
  max-width: 300px;
  margin: 2rem auto;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
}

button {
  padding: 0.5rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

button:hover {
  background-color: #2563eb;
}

.error {
  color: #dc2626;
  margin-top: 0.5rem;
  text-align: center;
}
</style>
