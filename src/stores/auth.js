import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  // Mock users for authentication
  const mockUsers = [
    { id: 1, email: 'admin@example.com', password: 'admin123', name: 'Admin User' },
    { id: 2, email: 'user@example.com', password: 'user123', name: 'Regular User' }
  ]

  // Check if user is logged in on app start
  const initializeAuth = () => {
    const savedUser = localStorage.getItem('ticketUser')
    const savedToken = localStorage.getItem('ticketToken')
    
    if (savedUser && savedToken) {
      user.value = JSON.parse(savedUser)
    }
    loading.value = false
  }

  // Login function
  const login = (email, password) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password)
    
    if (foundUser) {
      const userData = { id: foundUser.id, email: foundUser.email, name: foundUser.name }
      const token = 'mock-jwt-token-' + Date.now()
      
      user.value = userData
      localStorage.setItem('ticketUser', JSON.stringify(userData))
      localStorage.setItem('ticketToken', token)
      return { success: true, user: userData }
    } else {
      return { success: false, error: 'Invalid email or password' }
    }
  }

  // Logout function
  const logout = () => {
    user.value = null
    localStorage.removeItem('ticketUser')
    localStorage.removeItem('ticketToken')
  }

  // Computed property to check if user is authenticated
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    loading,
    isAuthenticated,
    initializeAuth,
    login,
    logout
  }
})