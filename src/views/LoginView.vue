<template>
  <div class="hero-wave">
    <div class="container">
      <div class="login-container">
        <h1 style="text-align: center; margin-bottom: 2rem; color: white">
          Ticket Management System
        </h1>
        
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email" class="form-label" style="color: white">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              class="form-input"
              v-model="email"
              required
              aria-required="true"
              placeholder="Enter your email"
            />
          </div>

          <div class="form-group">
            <label for="password" class="form-label" style="color: white">
              Password
            </label>
            <input
              id="password"
              type="password"
              class="form-input"
              v-model="password"
              required
              aria-required="true"
              placeholder="Enter your password"
            />
          </div>

          <div 
            v-if="error" 
            style="color: #fecaca; background-color: #7f1d1d; padding: 0.75rem; border-radius: 4px; margin-bottom: 1rem; border: 1px solid #fecaca"
          >
            {{ error }}
          </div>

          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="loading"
            style="width: 100%; margin-bottom: 1rem"
          >
            {{ loading ? 'Signing In...' : 'Sign In' }}
          </button>

          <div style="border-top: 1px solid white; padding-top: 1rem">
            <p style="color: white; margin-bottom: 0.5rem">Demo Accounts:</p>
            <button 
              type="button"
              class="btn btn-secondary"
              style="width: 100%; margin-bottom: 0.5rem"
              @click="fillDemoCredentials('admin')"
            >
              Use Admin Account
            </button>
            <button 
              type="button"
              class="btn btn-secondary"
              style="width: 100%"
              @click="fillDemoCredentials('user')"
            >
              Use Regular User Account
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

// Redirect if already logged in
onMounted(() => {
  authStore.initializeAuth()
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  const result = authStore.login(email.value, password.value)
  
  if (result.success) {
    router.push('/dashboard')
  } else {
    error.value = result.error
  }
  
  loading.value = false
}

const fillDemoCredentials = (type) => {
  if (type === 'admin') {
    email.value = 'admin@example.com'
    password.value = 'admin123'
  } else {
    email.value = 'user@example.com'
    password.value = 'user123'
  }
}
</script>