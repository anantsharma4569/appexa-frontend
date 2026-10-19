<script setup>
import CtaBand from '@/components/CtaBand.vue'
import PersonCard from '@/components/PersonCard.vue'

defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})
</script>

<template>
  <div>
    <section>
      <div class="wrap">
        <div class="sec-head">
          <h2>Our team</h2>
          <p>
            Appexa runs on a small, accountable team across production, quality, regulatory affairs,
            field sales and support.
          </p>
        </div>

        <div v-for="group in content.team || []" :key="group.department" class="dept">
          <div class="dept-head">
            <h3>{{ group.department }}</h3>
            <span>{{ group.members.length }} {{ group.members.length === 1 ? 'person' : 'people' }}</span>
          </div>
          <div class="roster">
            <PersonCard v-for="person in group.members" :key="person.name" :person="person" />
          </div>
        </div>
      </div>
    </section>

    <CtaBand
      heading="Want to join them?"
      text="We hire across production, quality, regulatory and field sales."
      action="See open roles"
      to="/careers"
    />
  </div>
</template>
