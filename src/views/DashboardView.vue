<template>
  <main class="dashboard-shell">
    <header class="dashboard-nav">
      <RouterLink class="brand dark-brand" to="/dashboard"><span class="brand-mark">V</span> vueauth</RouterLink>
      <div class="nav-right">
        <span class="status-pill"><i></i> Demo session active</span>
        <button class="logout-button" @click="handleLogout">Log out <span aria-hidden="true">↗</span></button>
      </div>
    </header>

    <section class="dashboard-content">
      <div class="dashboard-welcome">
        <p class="eyebrow">YOUR WORKSPACE</p>
        <h1>Welcome, {{ auth.user?.name?.split(' ')[0] || 'there' }}.</h1>
        <p>You are signed in. Your authentication flow is working.</p>
      </div>

      <div class="dashboard-grid">
        <article class="welcome-card">
          <div class="card-icon">✦</div>
          <p class="eyebrow">ACCOUNT OVERVIEW</p>
          <h2>You're all set.</h2>
          <p>This protected dashboard is only available while a demo session is active.</p>
          <div class="account-line"><span>Account status</span><strong>Active</strong></div>
        </article>

        <article class="profile-card">
          <p class="eyebrow">PROFILE DETAILS</p>
          <div class="avatar">{{ initials }}</div>
          <h2>{{ auth.user?.name }}</h2>
          <p class="profile-email">{{ auth.user?.email }}</p>
          <div class="profile-divider"></div>
          <div class="account-line"><span>Authentication</span><strong>Pinia session</strong></div>
          <div class="account-line"><span>Storage</span><strong>Browser demo</strong></div>
        </article>
      </div>

      <div class="info-banner">
        <span class="info-icon">i</span>
        <div><strong>Learning project, not production authentication</strong><p>This demo stores account records and session data in this browser. A real application must verify credentials and authorize requests on a secure backend.</p></div>
      </div>
    </section>
    <footer class="dashboard-footer">VueAuth · Built with Vue 3, Pinia &amp; Vue Router</footer>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const auth = useAuthStore()
const router = useRouter()
const initials = computed(() =>
  (auth.user?.name || 'User')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
)

function handleLogout() {
  auth.logout()
  router.replace('/login')
}
</script>