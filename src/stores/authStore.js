import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService } from '../services/authService'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(authService.getSession())
  const loading = ref(false)
  const error = ref('')

  const isAuthenticated = computed(() => Boolean(user.value))

  async function register(formData) {
    loading.value = true
    error.value = ''
    try {
      user.value = await authService.register(formData)
      return true
    } catch (err) {
      error.value = err.message || 'Registration failed. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  async function login(credentials) {
    loading.value = true
    error.value = ''
    try {
      user.value = await authService.login(credentials)
      return true
    } catch (err) {
      error.value = err.message || 'Login failed. Please try again.'
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    authService.logout()
    user.value = null
    error.value = ''
  }

  function clearError() {
    error.value = ''
  }

  return { user, loading, error, isAuthenticated, register, login, logout, clearError }
})