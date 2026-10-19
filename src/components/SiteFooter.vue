<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({ settings: { type: Object, default: () => ({}) } })

const address = computed(() => {
  const s = props.settings
  return [s.address, s.city, s.pincode, s.state, 'India'].filter(Boolean).join(', ')
})
const year = new Date().getFullYear()
</script>

<template>
  <footer class="site">
    <div class="wrap">
      <div class="fgrid">
        <div>
          <h4>{{ settings.company_name || 'Appexa Pharmaceuticals Private Limited' }}</h4>
          <p style="margin-bottom: 0.8rem">{{ address }}</p>
          <p style="margin: 0">
            <template v-if="settings.iso_certification">{{ settings.iso_certification }}</template>
            <template v-if="settings.cin"> · CIN {{ settings.cin }}</template>
          </p>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><RouterLink to="/">Home</RouterLink></li>
            <li><RouterLink to="/products">Products</RouterLink></li>
            <li><RouterLink to="/team">Our team</RouterLink></li>
            <li><RouterLink to="/careers">Careers</RouterLink></li>
            <li><RouterLink to="/contact">Contact</RouterLink></li>
          </ul>
        </div>
        <div>
          <h4>Reach us</h4>
          <ul>
            <li v-if="settings.phone">
              <a :href="`tel:${settings.phone.replace(/\s/g, '')}`">{{ settings.phone }}</a>
            </li>
            <li v-if="settings.email"><a :href="`mailto:${settings.email}`">{{ settings.email }}</a></li>
            <li v-if="settings.whatsapp_number">
              <a :href="`https://wa.me/${settings.whatsapp_number}`" target="_blank" rel="noopener">WhatsApp</a>
            </li>
            <li v-if="settings.facebook_url">
              <a :href="settings.facebook_url" target="_blank" rel="noopener">Facebook</a>
            </li>
            <li v-if="settings.instagram_url">
              <a :href="settings.instagram_url" target="_blank" rel="noopener">Instagram</a>
            </li>
            <li v-if="settings.linkedin_url">
              <a :href="settings.linkedin_url" target="_blank" rel="noopener">LinkedIn</a>
            </li>
          </ul>
        </div>
        <div>
          <h4>Hours</h4>
          <p style="margin-bottom: 0.6rem">{{ settings.business_hours }}</p>
          <p style="margin: 0">Order and support queries are answered outside these hours on WhatsApp.</p>
        </div>
      </div>
      <div class="fbot">
        <span>© {{ year }} {{ settings.company_name || 'Appexa Pharmaceuticals Private Limited' }}. All rights reserved.</span>
        <span>Privacy policy · Terms &amp; conditions</span>
      </div>
    </div>
  </footer>
</template>
