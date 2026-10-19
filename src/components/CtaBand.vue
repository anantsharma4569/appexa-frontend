<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  heading: { type: String, required: true },
  text: { type: String, default: '' },
  action: { type: String, required: true },
  to: { type: String, default: '/contact' },
})
</script>

<template>
  <div class="band">
    <div class="wrap" style="padding-top: 2.6rem; padding-bottom: 2.6rem">
      <div class="inner">
        <div>
          <h2>{{ heading }}</h2>
          <p v-if="text">{{ text }}</p>
        </div>
        <RouterLink class="btn btn-primary" :to="to">{{ action }}</RouterLink>
      </div>
    </div>
  </div>
</template>
