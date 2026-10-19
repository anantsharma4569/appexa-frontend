<script setup>
import { computed } from 'vue'
import { fileUrl } from '@/api'

const props = defineProps({ person: { type: Object, required: true } })

const photo = computed(() => fileUrl(props.person.photo))

// Placeholder portrait: a flat silhouette tinted per person, so an unfilled
// roster still looks deliberate. A Team Member with a photo shows the photo.
const TONES = [
  ['#E4EEE8', '#9FBCAC'],
  ['#EDEBE1', '#C0B9A0'],
  ['#E3EBF0', '#A1B5C1'],
  ['#F0E9E3', '#C5B0A0'],
  ['#E9EDE3', '#B0BC9C'],
  ['#EAE7EE', '#B1A8BE'],
]

const seed = computed(() => {
  const key = props.person.name || props.person.designation || ''
  let total = 0
  for (let i = 0; i < key.length; i += 1) total += key.charCodeAt(i)
  return total
})
const tone = computed(() => TONES[seed.value % TONES.length])
</script>

<template>
  <article class="person">
    <div class="pphoto">
      <img v-if="photo" :src="photo" :alt="person.member_name || person.designation" />
      <svg v-else viewBox="0 0 200 220" role="img" :aria-label="`${person.designation} portrait placeholder`">
        <rect width="200" height="220" :fill="tone[0]" />
        <circle cx="100" cy="92" r="42" :fill="tone[1]" />
        <path d="M28 220c0-40 32-62 72-62s72 22 72 62z" :fill="tone[1]" />
      </svg>
    </div>
    <div class="pinfo">
      <span v-if="person.member_name" class="nm">{{ person.member_name }}</span>
      <span v-else class="nm">Name to follow</span>
      <p class="rl">{{ person.designation }}</p>
      <p v-if="person.location" class="lc">{{ person.location }}</p>
    </div>
  </article>
</template>
