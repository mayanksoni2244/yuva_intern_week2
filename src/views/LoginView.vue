<template>
  <AuthLayout>
    <div class="form-heading">
      <p class="eyebrow">WELCOME BACK</p>
      <h2>Sign in to your account</h2>
      <p>Enter your details to continue to your workspace.</p>
    </div>

    <form class="auth-form" @submit.prevent="handleLogin">
      <FormField v-model="email" label="Email address" type="email" placeholder="you@example.com" autocomplete="email" />
      <FormField v-model="password" label="Password" type="password" placeholder="Enter your password" autocomplete="current-password" />
      <p v-if="validationError" class="message error">{{ validationError }}</p>
      <p v-if="auth.error" class="message error">{{ auth.error }}</p>
      <button class="primary-button" type="submit" :disabled="auth.loading">
        {{ auth.loading ? 'Signing in...' : 'Sign in' }} <span aria-hidden="true">→</span>
      </button>
    </form>

    <p class="switch-copy">Don't have an account? <RouterLink to="/register">Create account</RouterLink></p>
    <div class="demo-note"><strong>Demo note</strong><span>Register an account first. Your demo account stays in this browser.</span></div>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import AuthLayout from '../components/AuthLayout.vue'
import FormField from '../components/FormField.vue'

const email = ref('')
const password = ref('')
const validationError = ref('')
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleLogin() {
  validationError.value = ''
  auth.clearError()
  if (!email.value.trim() || !password.value) {
    validationError.value = 'Please enter both your email and password.'
    return
  }
  const success = await auth.login({ email: email.value, password: password.value })
  if (success) {
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/dashboard'
    router.replace(redirect)
  }
}
</script>