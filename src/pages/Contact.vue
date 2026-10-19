<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import EnquiryForm from '@/components/EnquiryForm.vue'

defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const route = useRoute()

// Set when someone arrives from a product card.
const product = computed(() => String(route.query.product || ''))
const purpose = computed(() => String(route.query.purpose || 'Distributor or stockist enquiry'))
</script>

<template>
  <section>
    <div class="wrap">
      <div class="sec-head">
        <h2>Contact us</h2>
        <p>
          Distributor appointments, third-party manufacturing, product enquiries or job applications
          — one form handles all of it.
        </p>
      </div>
      <EnquiryForm :settings="settings" :purpose="purpose" :product="product" />
    </div>
  </section>
</template>
