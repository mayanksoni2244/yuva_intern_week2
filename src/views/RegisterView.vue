<template>
  <AuthLayout>
    <div class="form-heading">
      <p class="eyebrow">GET STARTED</p>
      <h2>Create your account</h2>
      <p>Set up your account in just a few steps.</p>
    </div>

    <form class="auth-form" @submit.prevent="handleRegister">
      <FormField v-model="name" label="Full name" placeholder="Your name" autocomplete="name" />
      <FormField v-model="email" label="Email address" type="email" placeholder="you@example.com" autocomplete="email" />
      <FormField v-model="password" label="Password" type="password" placeholder="At least 8 characters" autocomplete="new-password" hint="Use uppercase, lowercase, and at least one number." />
      <FormField v-model="confirmPassword" label="Confirm password" type="password" placeholder="Enter password again" autocomplete="new-password" />
      <p v-if="validationError" class="message error">{{ validationError }}</p>
      <p v-if="auth.error" class="message error">{{ auth.error }}</p>
      <button class="primary-button" type="submit" :disabled="auth.loading">
        {{ auth.loading ? 'Creating account...' : 'Create account' }} <span aria-hidden="true">→</span>
      </button>
    </form>

    <p class="switch-copy">Already have an account? <RouterLink to="/login">Sign in</RouterLink></p>
  </AuthLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import AuthLayout from '../components/AuthLayout.vue'
import FormField from '../components/FormField.vue'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const validationError = ref('')
const auth = useAuthStore()
const router = useRouter()

function validateForm() {
  if (!name.value.trim()) return 'Please enter your full name.'
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(email.value.trim())) return 'Please enter a valid email address.'
  if (password.value.length < 8) return 'Password must contain at least 8 characters.'
  if (!/[A-Z]/.test(password.value) || !/[a-z]/.test(password.value) || !/[0-9]/.test(password.value)) {
    return 'Password must include uppercase, lowercase, and a number.'
  }
  if (password.value !== confirmPassword.value) return 'Passwords do not match.'
  return ''
}

async function handleRegister() {
  validationError.value = validateForm()
  auth.clearError()
  if (validationError.value) return
  const success = await auth.register({
    name: name.value,
    email: email.value,
    password: password.value
  })
  if (success) router.replace('/dashboard')
}
</script>