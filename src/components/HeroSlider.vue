<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { fileUrl } from '@/api'
import PackArt from './PackArt.vue'

const props = defineProps({ slides: { type: Array, default: () => [] } })

const at = ref(0)
const paused = ref(false)
let timer = null

const count = computed(() => props.slides.length)
// Each slide shows two packs, cycling through the dosage forms.
const artPairs = [
  [{ slug: 'tablets', brand: 'Apexcef-200' }, { slug: 'capsules', brand: 'Apexome-D' }],
  [{ slug: 'injectables', brand: 'Apexcef-IV' }, { slug: 'topicals', brand: 'Apexnac Gel' }],
  [{ slug: 'syrups', brand: 'Apexmol Syrup' }, { slug: 'nutra', brand: 'Apexvit Gold' }],
]

function go(n) {
  if (!count.value) return
  at.value = (n + count.value) % count.value
}

function start() {
  stop()
  if (count.value > 1) timer = setInterval(() => !paused.value && go(at.value + 1), 6500)
}
function stop() {
  if (timer) clearInterval(timer)
  timer = null
}

onMounted(start)
onBeforeUnmount(stop)

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReducedMotion) stop()
</script>

<template>
  <div
    v-if="count"
    class="slider"
    aria-roledescription="carousel"
    aria-label="Appexa highlights"
    @mouseenter="paused = true"
    @mouseleave="paused = false"
  >
    <div class="slides" :style="{ transform: `translateX(-${at * 100}%)` }">
      <div
        v-for="(slide, i) in slides"
        :key="slide.name"
        class="slide"
        role="group"
        :aria-label="`Slide ${i + 1} of ${count}`"
      >
        <div class="wrap">
          <div class="slide-inner">
            <div>
              <h2>{{ slide.title }}</h2>
              <p class="sp">{{ slide.slide_text }}</p>
              <div class="hero-cta">
                <RouterLink
                  v-if="slide.primary_cta_label"
                  class="btn btn-primary"
                  :to="slide.primary_cta_link || '/contact'"
                >{{ slide.primary_cta_label }}</RouterLink>
                <RouterLink
                  v-if="slide.secondary_cta_label"
                  class="btn btn-ghost"
                  :to="slide.secondary_cta_link || '/products'"
                >{{ slide.secondary_cta_label }}</RouterLink>
              </div>
            </div>
            <div class="slide-art">
              <img v-if="slide.image" :src="fileUrl(slide.image)" :alt="slide.title" />
              <div v-else class="art-pair" aria-hidden="true">
                <PackArt
                  v-for="art in artPairs[i % artPairs.length]"
                  :key="art.slug"
                  :slug="art.slug"
                  :brand="art.brand"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button v-if="count > 1" class="snav prev" type="button" aria-label="Previous slide" @click="go(at - 1)">‹</button>
    <button v-if="count > 1" class="snav next" type="button" aria-label="Next slide" @click="go(at + 1)">›</button>
    <div v-if="count > 1" class="sctrl">
      <div class="wrap">
        <div class="dots">
          <button
            v-for="(slide, i) in slides"
            :key="slide.name"
            type="button"
            :aria-current="i === at"
            :aria-label="`Go to slide ${i + 1}`"
            @click="go(i)"
          ></button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* The two packs overlap slightly, the second smaller and lower, so the pair
   reads as a product group rather than two icons in a row. */
.art-pair {
  display: flex;
  align-items: flex-end;
  max-width: 530px;
  margin-left: auto;
}
.art-pair > :deep(svg) {
  width: 62%;
  filter: drop-shadow(0 12px 22px rgba(4, 28, 18, 0.28));
}
.art-pair > :deep(svg:last-child) {
  width: 50%;
  margin-left: -12%;
  margin-bottom: -4%;
}
@media (max-width: 980px) {
  .art-pair {
    margin: 0 auto;
    max-width: 360px;
  }
}
</style>
