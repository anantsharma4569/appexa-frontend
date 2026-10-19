<script setup>
import { computed, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { siteContent } from '@/api'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SvgDefs from '@/components/SvgDefs.vue'
import WhatsAppWidget from '@/components/WhatsAppWidget.vue'

const content = computed(() => siteContent.data || {})
const settings = computed(() => content.value.settings || {})

onMounted(() => {
  try {
    const saved = localStorage.getItem('appexa:theme')
    if (saved) document.documentElement.dataset.theme = saved
  } catch {
    // No stored preference available; the OS setting decides.
  }
})
</script>

<template>
  <a class="skip" href="#content">Skip to content</a>
  <SvgDefs />
  <SiteHeader :settings="settings" />

  <main id="content">
    <p v-if="siteContent.loading && !siteContent.data" class="loading">Loading…</p>
    <div v-else-if="siteContent.error" class="wrap" style="padding: 4rem 20px">
      <h2>We could not load the site content</h2>
      <p>
        The website is up but the content service did not respond. Please refresh, or call us on
        <a href="tel:+919068188171">+91 90681 88171</a>.
      </p>
    </div>
    <RouterView v-else :content="content" :settings="settings" />
  </main>

  <SiteFooter :settings="settings" />
  <WhatsAppWidget :number="settings.whatsapp_number" :topics="content.whatsapp_topics || []" />
</template>
