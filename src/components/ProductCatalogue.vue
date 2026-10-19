<script setup>
import { computed, ref } from 'vue'
import PackArt from './PackArt.vue'

const props = defineProps({
  products: { type: Array, default: () => [] },
  categories: { type: Array, default: () => [] },
  limit: { type: Number, default: 0 },
  searchable: { type: Boolean, default: false },
  // On the products page the button starts an enquiry; elsewhere it links out.
  enquirable: { type: Boolean, default: false },
})
const emit = defineEmits(['enquire'])

const active = ref('all')
const query = ref('')

const slugFor = (categoryName) =>
  props.categories.find((c) => c.name === categoryName)?.slug || ''

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  let list = props.products.filter((p) => {
    if (active.value !== 'all' && p.category !== active.value) return false
    if (!q) return true
    return [p.brand, p.composition, p.dosage_form, p.pack_size, p.category]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .includes(q)
  })
  if (props.limit) list = list.slice(0, props.limit)
  return list
})
</script>

<template>
  <div>
    <div v-if="searchable" class="field" style="max-width: 420px">
      <label for="catalogue-search">Search the catalogue</label>
      <input
        id="catalogue-search"
        v-model="query"
        type="search"
        placeholder="e.g. paracetamol, syrup, 10×10"
        autocomplete="off"
      />
    </div>

    <div class="tabs" role="tablist" aria-label="Product categories">
      <button class="tab" role="tab" :aria-selected="active === 'all'" @click="active = 'all'">
        All products
      </button>
      <button
        v-for="category in categories"
        :key="category.name"
        class="tab"
        role="tab"
        :aria-selected="active === category.name"
        @click="active = category.name"
      >
        {{ category.category_name }}
      </button>
    </div>

    <div class="catalogue">
      <article v-for="product in filtered" :key="product.name" class="pcard">
        <div class="pvis">
          <PackArt :slug="slugFor(product.category)" :brand="product.brand" :image="product.image" />
          <span class="ptag">{{ product.category }}</span>
        </div>
        <div class="pbody">
          <h3>{{ product.brand }}</h3>
          <p class="comp">{{ product.composition }}</p>
          <dl class="pmeta">
            <div><dt>Form</dt><dd>{{ product.dosage_form || '—' }}</dd></div>
            <div><dt>Pack</dt><dd>{{ product.pack_size || '—' }}</dd></div>
          </dl>
          <button
            v-if="enquirable"
            class="btn btn-ghost btn-sm"
            type="button"
            @click="emit('enquire', product.brand)"
          >Enquire about this</button>
          <RouterLink v-else class="btn btn-ghost btn-sm" to="/products">View details</RouterLink>
        </div>
      </article>

      <div v-if="!filtered.length" class="empty">
        No products match that search. Try a molecule name, a dosage form, or clear the search box.
      </div>
    </div>
  </div>
</template>
