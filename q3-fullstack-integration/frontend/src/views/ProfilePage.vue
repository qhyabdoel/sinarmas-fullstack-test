<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

const router = useRouter()

const message = ref('')
const loading = ref(true)

// Fetch profile message on mount
onMounted(async () => {
  try {
    // Call protected profile endpoint
    const res = await api.get<{ message: string }>('/profile')
    message.value = res.data.message
  } catch {
    message.value = 'Unauthorized'
  } finally {
    loading.value = false
  }
})

const logout = async () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <div>
    <h2>Profile</h2>
    <p v-if="loading">Loading...</p>
    <p>{{ message }}</p>
    <button @click="logout">Log out</button>
  </div>
</template>
