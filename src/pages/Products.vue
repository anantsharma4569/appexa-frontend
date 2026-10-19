<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductCatalogue from '@/components/ProductCatalogue.vue'

const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const router = useRouter()

/** Carry the product name across to the contact form. */
function enquire(brand) {
  router.push({ path: '/contact', query: { product: brand, purpose: 'Product or price-list enquiry' } })
}
</script>

<template>
  <section>
    <div class="wrap">
      <div class="sec-head">
        <h2>Product catalogue</h2>
        <p>
          Filter by dosage form, or search by brand or composition. Every item can be enquired on
          directly — the enquiry form will carry the product name across.
        </p>
      </div>
      <ProductCatalogue
        :products="content.products || []"
        :categories="content.categories || []"
        searchable
        enquirable
        @enquire="enquire"
      />
    </div>
  </section>
</template>
