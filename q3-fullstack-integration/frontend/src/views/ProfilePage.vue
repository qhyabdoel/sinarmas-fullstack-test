<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const message = ref('')
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await api.get<{ message: string }>('/profile')
    message.value = res.data.message
  } catch {
    message.value = 'Unauthorized'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h2>Profile</h2>
    <p v-if="loading">Loading...</p>
    <p>{{ message }}</p>
  </div>
</template>
