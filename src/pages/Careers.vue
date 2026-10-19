<script setup>
import { ref } from 'vue'
import EnquiryForm from '@/components/EnquiryForm.vue'

defineProps({
  content: { type: Object, default: () => ({}) },
  settings: { type: Object, default: () => ({}) },
})

const openJob = ref(null)
const appliedFor = ref('')
const formTop = ref(null)

function toggle(job) {
  openJob.value = openJob.value === job.name ? null : job.name
}

/** Jump to the form with the position already filled in. */
function apply(job) {
  appliedFor.value = job.job_title
  formTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const WHY = [
  {
    title: 'Training that counts',
    text: 'Product and compliance training from day one, including shop-floor and laboratory exposure for non-technical roles.',
  },
  {
    title: 'Clear progression',
    text: 'Defined review cycles and internal movement between field, production and quality functions.',
  },
  {
    title: 'Stable, growing base',
    text: 'An expanding product range and distribution network means new territories and new responsibilities regularly.',
  },
]
</script>

<template>
  <div>
    <section>
      <div class="wrap">
        <div class="sec-head">
          <h2>Careers at Appexa</h2>
          <p>
            A young company, so the work is broad and the decisions are close to you. Most roles are
            based in {{ settings.city || 'Muzaffarnagar' }}; field roles cover western Uttar Pradesh
            and Uttarakhand.
          </p>
        </div>

        <div class="grid-3" style="margin-bottom: 2.4rem">
          <div v-for="item in WHY" :key="item.title" class="card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </div>
        </div>

        <h3 style="font-size: 1.25rem; margin-bottom: 1rem">Open positions</h3>

        <div v-for="job in content.jobs || []" :key="job.name" class="job" :class="{ open: openJob === job.name }">
          <button class="job-top" type="button" :aria-expanded="openJob === job.name" @click="toggle(job)">
            <h3>{{ job.job_title }}</h3>
            <span class="f"><b>Location</b>{{ job.location }}</span>
            <span class="f"><b>Experience</b>{{ job.experience }}</span>
            <span class="chev" aria-hidden="true">{{ openJob === job.name ? '▲' : '▼' }}</span>
          </button>
          <div v-if="openJob === job.name" class="job-body">
            <p>{{ job.about }}</p>
            <template v-if="job.duties.length">
              <h4>What you will do</h4>
              <ul>
                <li v-for="duty in job.duties" :key="duty">{{ duty }}</li>
              </ul>
            </template>
            <template v-if="job.requirements.length">
              <h4>What we are looking for</h4>
              <ul>
                <li v-for="need in job.requirements" :key="need">{{ need }}</li>
              </ul>
            </template>
            <button class="btn btn-primary btn-sm" type="button" @click="apply(job)">
              Apply for this role
            </button>
          </div>
        </div>

        <p v-if="!(content.jobs || []).length" class="empty">
          No positions are open right now. Apply using the form below and we will keep your details on file.
        </p>

        <p style="margin-top: 1.6rem; color: var(--ink-2); font-size: 0.92rem">
          Nothing matching your profile? Apply anyway using the form below and mention the function
          you are interested in.
        </p>
      </div>
    </section>

    <hr class="rule" />

    <section>
      <div ref="formTop" class="wrap">
        <div class="sec-head">
          <h2>Apply</h2>
          <p>Send your details and our HR team will come back to you. You can also apply over WhatsApp.</p>
        </div>
        <EnquiryForm :settings="settings" purpose="Job application" :position="appliedFor" />
      </div>
    </section>
  </div>
</template>
