<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

defineProps({ settings: { type: Object, default: () => ({}) } })

const route = useRoute()
const menuOpen = ref(false)
const theme = ref(document.documentElement.dataset.theme || '')

watch(() => route.fullPath, () => (menuOpen.value = false))

function toggleTheme() {
  const dark = theme.value === 'dark'
  theme.value = dark ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
  try {
    localStorage.setItem('appexa:theme', theme.value)
  } catch {
    // Private windows and blocked site data: the theme just will not persist.
  }
}
</script>

<template>
  <header class="site">
    <div class="utility">
      <div class="wrap">
        <span v-if="settings.iso_certification" class="badge">{{ settings.iso_certification }}</span>
        <span v-if="settings.cin" class="hide-sm">CIN {{ settings.cin }}</span>
        <span class="spacer"></span>
        <a v-if="settings.email" class="hide-sm" :href="`mailto:${settings.email}`">{{ settings.email }}</a>
        <a
          v-if="settings.whatsapp_number"
          :href="`https://wa.me/${settings.whatsapp_number}`"
          target="_blank"
          rel="noopener"
        >WhatsApp</a>
        <a v-if="settings.phone" :href="`tel:${settings.phone.replace(/\s/g, '')}`">{{ settings.phone }}</a>
      </div>
    </div>
    <div class="navbar">
      <div class="wrap">
        <RouterLink class="brand" to="/">
          <span class="mark" aria-hidden="true">A</span>
          <span><b>Appexa Pharmaceuticals</b><span>PRIVATE LIMITED</span></span>
        </RouterLink>
        <nav class="main" :class="{ open: menuOpen }">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/products">Products</RouterLink>
          <RouterLink to="/team">Our team</RouterLink>
          <RouterLink to="/careers">Careers</RouterLink>
          <RouterLink to="/contact">Contact</RouterLink>
        </nav>
        <RouterLink class="btn btn-primary btn-sm hide-sm" to="/contact">Get a quotation</RouterLink>
        <button class="iconbtn" type="button" aria-label="Switch colour theme" @click="toggleTheme">◐</button>
        <button
          class="iconbtn burger"
          type="button"
          aria-label="Open menu"
          :aria-expanded="menuOpen"
          @click="menuOpen = !menuOpen"
        >☰</button>
      </div>
    </div>
  </header>
</template>
