<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { errorMessage, submitEnquiry } from '@/api'

const props = defineProps({
  settings: { type: Object, default: () => ({}) },
  // Preselect the dropdown, e.g. "Job application" on the careers page.
  purpose: { type: String, default: 'Distributor or stockist enquiry' },
  product: { type: String, default: '' },
  // Prefilled when someone clicks Apply on a specific job.
  position: { type: String, default: '' },
})

const PURPOSES = [
  'Distributor or stockist enquiry',
  'Third-party manufacturing',
  'Product or price-list enquiry',
  'Job application',
  'Something else',
]

const form = reactive({
  purpose: props.purpose,
  full_name: '',
  phone: '',
  email: '',
  city: '',
  company: '',
  product_interest: props.product,
  position: props.position,
  experience: '',
  resume_link: '',
  message: '',
  consent: false,
})

const errors = reactive({})
const sending = ref(false)
const sent = ref(null)
const failure = ref('')

const isJob = computed(() => form.purpose === 'Job application')

watch(() => props.product, (value) => {
  if (value) form.product_interest = value
})
watch(() => props.purpose, (value) => {
  if (value) form.purpose = value
})
watch(() => props.position, (value) => {
  if (value) form.position = value
})

function validate() {
  Object.keys(errors).forEach((key) => delete errors[key])
  if (!form.full_name.trim()) errors.full_name = 'Please enter your name.'
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, '').slice(-10)))
    errors.phone = 'Enter a valid 10-digit mobile number.'
  if (!/^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$/.test(form.email.trim()))
    errors.email = 'Enter a valid email address.'
  return !Object.keys(errors).length
}

async function send() {
  failure.value = ''
  if (!validate()) return
  sending.value = true
  try {
    const result = await submitEnquiry.submit({ ...form, consent: form.consent ? 1 : 0 })
    sent.value = result
  } catch (error) {
    failure.value = errorMessage(error)
  } finally {
    sending.value = false
  }
}

function reset() {
  sent.value = null
  Object.assign(form, {
    full_name: '',
    phone: '',
    email: '',
    city: '',
    company: '',
    product_interest: '',
    position: '',
    experience: '',
    resume_link: '',
    message: '',
    consent: false,
  })
}

/** Same details, sent over WhatsApp instead. */
const whatsappLink = computed(() => {
  const lines = [
    `Hello Appexa Pharmaceuticals.`,
    `Purpose: ${form.purpose}`,
    `Name: ${form.full_name}`,
    form.city && `City: ${form.city}`,
    form.company && `Firm: ${form.company}`,
    form.product_interest && `Product: ${form.product_interest}`,
    form.position && `Position: ${form.position}`,
    form.experience && `Experience: ${form.experience}`,
    form.message && `Message: ${form.message}`,
  ].filter(Boolean)
  return `https://wa.me/${props.settings.whatsapp_number}?text=${encodeURIComponent(lines.join('\n'))}`
})
</script>

<template>
  <div class="formwrap">
    <div v-if="sent" class="result">
      <h3>Thank you, {{ form.full_name || 'and noted' }}.</h3>
      <p>
        Your enquiry is logged as <b>{{ sent.name }}</b>. Our team will get back to you on the phone
        number and email you gave us, usually within one working day.
      </p>
      <div class="acts">
        <a
          v-if="settings.whatsapp_number"
          class="btn btn-primary"
          :href="whatsappLink"
          target="_blank"
          rel="noopener"
        >Send the same on WhatsApp</a>
        <button class="btn btn-ghost" type="button" @click="reset">Send another enquiry</button>
      </div>
    </div>

    <form v-else class="enq" novalidate @submit.prevent="send">
      <p v-if="failure" class="formerr">{{ failure }}</p>

      <div class="field">
        <label for="purpose">What is this about <span class="req">*</span></label>
        <select id="purpose" v-model="form.purpose">
          <option v-for="option in PURPOSES" :key="option">{{ option }}</option>
        </select>
      </div>

      <div class="fieldrow">
        <div class="field" :class="{ invalid: errors.full_name }">
          <label for="fullname">Full name <span class="req">*</span></label>
          <input id="fullname" v-model="form.full_name" type="text" autocomplete="name" />
          <span v-if="errors.full_name" class="err">{{ errors.full_name }}</span>
        </div>
        <div class="field" :class="{ invalid: errors.phone }">
          <label for="phone">Phone <span class="req">*</span></label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            inputmode="tel"
            autocomplete="tel"
            placeholder="10-digit mobile number"
          />
          <span v-if="errors.phone" class="err">{{ errors.phone }}</span>
        </div>
      </div>

      <div class="fieldrow">
        <div class="field" :class="{ invalid: errors.email }">
          <label for="email">Email <span class="req">*</span></label>
          <input id="email" v-model="form.email" type="email" autocomplete="email" />
          <span v-if="errors.email" class="err">{{ errors.email }}</span>
        </div>
        <div class="field">
          <label for="city">City and state</label>
          <input id="city" v-model="form.city" type="text" autocomplete="address-level2" />
        </div>
      </div>

      <template v-if="!isJob">
        <div class="field">
          <label for="company">Firm or organisation</label>
          <input id="company" v-model="form.company" type="text" autocomplete="organization" />
        </div>
        <div class="field">
          <label for="product">Product or range you are interested in</label>
          <input
            id="product"
            v-model="form.product_interest"
            type="text"
            placeholder="e.g. Tablets, Apexcef-200"
          />
        </div>
      </template>

      <template v-else>
        <div class="fieldrow">
          <div class="field">
            <label for="position">Position applying for</label>
            <input id="position" v-model="form.position" type="text" />
          </div>
          <div class="field">
            <label for="experience">Years of experience</label>
            <input
              id="experience"
              v-model="form.experience"
              type="text"
              placeholder="e.g. 3 years, or fresher"
            />
          </div>
        </div>
        <div class="field">
          <label for="resume">Link to your CV (Google Drive, Dropbox)</label>
          <input id="resume" v-model="form.resume_link" type="url" placeholder="https://" />
        </div>
      </template>

      <div class="field">
        <label for="message">Message</label>
        <textarea
          id="message"
          v-model="form.message"
          placeholder="Territory you cover, monthly volume, or anything else we should know."
        ></textarea>
      </div>

      <label class="check">
        <input v-model="form.consent" type="checkbox" />
        <span>I agree that Appexa Pharmaceuticals may contact me about this enquiry.</span>
      </label>

      <button class="btn btn-primary" type="submit" :disabled="sending">
        {{ sending ? 'Sending…' : 'Send enquiry' }}
      </button>
    </form>

    <aside class="aside-box">
      <h3>Or reach us directly</h3>
      <ul class="contact-list">
        <li v-if="settings.phone">
          <b>Phone</b><a :href="`tel:${settings.phone.replace(/\s/g, '')}`">{{ settings.phone }}</a>
        </li>
        <li v-if="settings.whatsapp_number">
          <b>WhatsApp</b>
          <a :href="`https://wa.me/${settings.whatsapp_number}`" target="_blank" rel="noopener">
            Message us
          </a>
        </li>
        <li v-if="settings.email">
          <b>Email</b><a :href="`mailto:${settings.email}`">{{ settings.email }}</a>
        </li>
        <li>
          <b>Address</b>
          {{ [settings.address, settings.city, settings.pincode, settings.state].filter(Boolean).join(', ') }}
        </li>
        <li v-if="settings.business_hours"><b>Hours</b>{{ settings.business_hours }}</li>
      </ul>
    </aside>
  </div>
</template>
