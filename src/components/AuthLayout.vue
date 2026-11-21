<template>
  <main class="auth-shell">
    <section class="auth-aside">
      <div class="brand"><span class="brand-mark">V</span> vueauth</div>
      <div class="aside-copy">
        <p class="eyebrow">A simpler way to get started</p>
        <h1>Your workspace.<br /><span>Your way.</span></h1>
        <p class="aside-description">A clean, focused account experience built with Vue 3.</p>
      </div>
      <div class="aside-bottom">Secure by design · Built for learning</div>
      <div class="orb orb-one"></div><div class="orb orb-two"></div>
    </section>
    <section class="auth-main">
      <div class="mobile-brand"><span class="brand-mark">V</span> vueauth</div>
      <div class="auth-card">
        <slot />
      </div>
      <p class="auth-footer">VueAuth demo · Week 2 frontend implementation</p>
    </section>
  </main>
</template>