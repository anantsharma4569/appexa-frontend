<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CtaBand from '@/components/CtaBand.vue'
import HeroSlider from '@/components/HeroSlider.vue'
import PersonCard from '@/components/PersonCard.vue'
import ProductCatalogue from '@/components/ProductCatalogue.vue'

const props = defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const categories = computed(() => props.content.categories || [])
const products = computed(() => props.content.products || [])

/** First few people across departments, as a taste of the full roster. */
const teamPreview = computed(() =>
  (props.content.team || []).flatMap((group) => group.members).slice(0, 4),
)

const countFor = (category) =>
  products.value.filter((p) => p.category === category.name).length

const HOW_WE_WORK = [
  {
    kicker: 'Research & development',
    title: 'Formulation that holds up',
    text: 'We develop and refine formulations against current regulatory standards, testing for safety, efficacy and shelf stability before a product is cleared for production.',
  },
  {
    kicker: 'Quality control',
    title: 'Tested at every stage',
    text: 'Raw materials, in-process samples and finished batches are analysed in our laboratory under GMP-compliant protocols for purity, potency and stability.',
  },
  {
    kicker: 'Manufacturing',
    title: 'Six dosage forms',
    text: 'Tablets, capsules, oral liquids, injectables, topicals and nutraceuticals, produced with full batch documentation and controlled hygiene conditions.',
  },
  {
    kicker: 'Distribution',
    title: 'Stock where it is needed',
    text: 'A growing distributor and stockist network keeps supply predictable for pharmacies, hospitals and institutional buyers across India.',
  },
  {
    kicker: 'Contract manufacturing',
    title: 'Made under your brand',
    text: 'Third-party manufacturing for pharma marketing companies, including formulation support, packaging design and regulatory documentation.',
  },
  {
    kicker: 'Medical support',
    title: 'Working with prescribers',
    text: 'We brief doctors, pharmacists and distributors on composition, indications and correct handling so our products are used responsibly.',
  },
]
</script>

<template>
  <div>
    <h1 class="sr-only">{{ settings.company_name }}</h1>

    <HeroSlider :slides="content.slides || []" />

    <div class="hero">
      <div class="wrap">
        <dl class="proofstrip">
          <div><dt>Certification</dt><dd>{{ settings.iso_certification || '—' }}</dd></div>
          <div><dt>Manufacturing</dt><dd>GMP / GLP compliant</dd></div>
          <div><dt>Contract manufacturing</dt><dd>Available</dd></div>
          <div><dt>Head office</dt><dd>{{ settings.city }}, UP</dd></div>
          <div><dt>Dispatch</dt><dd>Pan-India</dd></div>
        </dl>
        <div class="rangebar">
          <RouterLink v-for="category in categories" :key="category.name" to="/products">
            <span class="l">{{ category.category_name }}<br /><small>{{ countFor(category) }} products</small></span>
            <span class="c" aria-hidden="true">→</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <section>
      <div class="wrap">
        <div class="sec-head">
          <h2>What we make</h2>
          <p>
            Six dosage families, each produced under documented hygiene, testing and batch-release
            protocols. Browse the full catalogue, or ask us for the price list of a single range.
          </p>
        </div>
        <ProductCatalogue :products="products" :categories="categories" :limit="8" />
        <p style="margin-top: 1.2rem"><RouterLink to="/products">Open the full catalogue</RouterLink></p>
      </div>
    </section>

    <hr class="rule" />

    <section>
      <div class="wrap">
        <div class="sec-head">
          <h2>How we work</h2>
          <p>From molecule to medical representative, the whole chain stays in-house or under direct supervision.</p>
        </div>
        <div class="grid-3">
          <div v-for="item in HOW_WE_WORK" :key="item.title" class="card">
            <span class="kicker">{{ item.kicker }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <hr class="rule" />

    <section v-if="teamPreview.length">
      <div class="wrap">
        <div class="sec-head">
          <h2>The people behind it</h2>
          <p>Production, quality, regulatory and field teams — the names you will actually deal with.</p>
        </div>
        <div class="roster">
          <PersonCard v-for="person in teamPreview" :key="person.name" :person="person" />
        </div>
        <p style="margin-top: 1.4rem"><RouterLink to="/team">Meet the full team</RouterLink></p>
      </div>
    </section>

    <hr class="rule" />

    <section v-if="(content.testimonials || []).length">
      <div class="wrap">
        <div class="sec-head"><h2>What our partners say</h2></div>
        <div class="quotes">
          <blockquote v-for="item in content.testimonials" :key="item.name" class="quote">
            <p>{{ item.quote }}</p>
            <footer><b>{{ item.author }}</b>{{ item.author_role }}</footer>
          </blockquote>
        </div>
      </div>
    </section>

    <CtaBand
      heading="Looking for a supply partner?"
      text="Tell us your territory and the ranges you move. We will send the price list and distributor terms."
      action="Send an enquiry"
    />

    <section v-if="(content.faqs || []).length">
      <div class="wrap">
        <div class="sec-head"><h2>Common questions</h2></div>
        <details v-for="faq in content.faqs" :key="faq.name" class="faq">
          <summary>{{ faq.question }}</summary>
          <p>{{ faq.answer }}</p>
        </details>
      </div>
    </section>
  </div>
</template>
