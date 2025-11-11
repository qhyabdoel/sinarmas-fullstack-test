<script setup lang="ts">
import { UserProfile, UserProfileErrors } from '@/types'
import { ref, reactive, watch } from 'vue'

// Mock initial user data
const profile = reactive<UserProfile>({
  name: 'John Doe',
  email: 'john@example.com',
  profilePicture: 'https://via.placeholder.com/100',
})

const saving = ref<boolean>(false)
const saved = ref<boolean>(false)

// initiate error messages
const errors = reactive<UserProfileErrors>({
  name: '',
  email: '',
})

// Validation function
function isValidProfile(): boolean {
  const nameValid: boolean = profile.name.trim().length > 0
  const emailValid: boolean = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)

  errors.name = nameValid ? '' : 'Name is required'
  errors.email = emailValid ? '' : 'Invalid email'

  return nameValid && emailValid
}

async function saveProfile(): Promise<void> {
  saving.value = true
  saved.value = false

  // Simulate API Call
  await new Promise<void>((resolve) => setTimeout(resolve, 1000))

  saving.value = false
  saved.value = true
  console.log('Profile saved:', profile)
}

// Debounce: auto-save 2 seconds after user stops typing
let timeout: ReturnType<typeof setTimeout> | null = null

// Watch for changes in profile
watch(
  profile,
  () => {
    // run validation function
    if (!isValidProfile()) {
      console.warn('Imvalid profile, not saving')
      return // skip saving
    }

    // clear prviouse timout then set a new one
    clearTimeout(timeout)
    timeout = setTimeout(() => saveProfile(), 2000)
  },
  { deep: true },
)
</script>

<template>
  <div class="user-profile">
    <h2>User Profile</h2>

    <form @submit.prevent>
      <label>
        Name:
        <input v-model="profile.name" type="text" />
        <small v-if="errors.name" class="error">{{ errors.name }}</small>
      </label>

      <label>
        Email:
        <input v-model="profile.email" type="email" />
        <small v-if="errors.email" class="error">{{ errors.email }}</small>
      </label>

      <label>
        Profile Picture URL:
        <input v-model="profile.profilePicture" type="text" />
      </label>
    </form>

    <div class="status">
      <span v-if="saving">Saving...</span>
      <span v-else-if="saved">Saved</span>
    </div>
  </div>
</template>

<style scoped>
.user-profile {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
label {
  display: block;
  margin-bottom: 12px;
}
input {
  width: 100%;
  padding: 6px;
  margin-top: 4px;
}
.status {
  margin-top: 10px;
  font-weight: bold;
}
.error {
  color: red;
  font-size: 0.8em;
}
</style>
