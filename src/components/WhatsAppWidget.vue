<script setup>
import { ref } from 'vue'

const props = defineProps({
  number: { type: String, default: '' },
  topics: { type: Array, default: () => [] },
})

const open = ref(false)

function link(topic) {
  return `https://wa.me/${props.number}?text=${encodeURIComponent(topic.message_template)}`
}
</script>

<template>
  <div v-if="number" class="wa">
    <div v-if="open" class="wa-panel" role="dialog" aria-label="Chat with Appexa on WhatsApp">
      <div class="wa-head">
        <span class="ic" aria-hidden="true">
          <svg viewBox="0 0 32 32" fill="currentColor">
            <path d="M16.02 3C8.84 3 3 8.84 3 16.02c0 2.3.6 4.54 1.75 6.52L3 29l6.63-1.73a12.95 12.95 0 0 0 6.39 1.67C23.2 28.94 29 23.1 29 15.93 29 8.76 23.2 3 16.02 3zm0 23.4a10.8 10.8 0 0 1-5.51-1.5l-.4-.24-4.1 1.07 1.1-4-.26-.41a10.76 10.76 0 0 1-1.65-5.75c0-5.96 4.86-10.8 10.83-10.8 2.89 0 5.6 1.13 7.64 3.17a10.72 10.72 0 0 1 3.17 7.64c0 5.96-4.86 10.82-10.82 10.82zm5.94-8.1c-.33-.17-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.17-.22.33-.85 1.06-1.04 1.28-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.93-1.82-2.26-.19-.33-.02-.5.14-.67.15-.15.33-.38.49-.58.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56l-.63-.01c-.22 0-.58.08-.88.41-.3.33-1.15 1.13-1.15 2.75s1.18 3.19 1.34 3.41c.16.22 2.32 3.54 5.62 4.96.78.34 1.4.54 1.88.69.79.25 1.51.21 2.08.13.63-.09 1.93-.79 2.21-1.56.27-.76.27-1.42.19-1.56-.08-.14-.3-.22-.63-.39z" />
          </svg>
        </span>
        <span><b>Chat with Appexa</b><span>We usually reply within the hour</span></span>
        <button class="wa-close" type="button" aria-label="Close chat options" @click="open = false">×</button>
      </div>
      <div class="wa-body">
        <p>Pick what this is about and WhatsApp will open with your message ready.</p>
        <a
          v-for="topic in topics"
          :key="topic.name"
          class="wa-opt"
          :href="link(topic)"
          target="_blank"
          rel="noopener"
        >{{ topic.topic_label }}</a>
      </div>
    </div>
    <button
      class="wa-fab"
      :class="{ quiet: open }"
      type="button"
      aria-label="Chat with us on WhatsApp"
      :aria-expanded="open"
      @click="open = !open"
    >
      <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16.02 3C8.84 3 3 8.84 3 16.02c0 2.3.6 4.54 1.75 6.52L3 29l6.63-1.73a12.95 12.95 0 0 0 6.39 1.67C23.2 28.94 29 23.1 29 15.93 29 8.76 23.2 3 16.02 3zm0 23.4a10.8 10.8 0 0 1-5.51-1.5l-.4-.24-4.1 1.07 1.1-4-.26-.41a10.76 10.76 0 0 1-1.65-5.75c0-5.96 4.86-10.8 10.83-10.8 2.89 0 5.6 1.13 7.64 3.17a10.72 10.72 0 0 1 3.17 7.64c0 5.96-4.86 10.82-10.82 10.82zm5.94-8.1c-.33-.17-1.93-.95-2.23-1.06-.3-.11-.52-.16-.74.17-.22.33-.85 1.06-1.04 1.28-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.62-.97-.87-1.63-1.93-1.82-2.26-.19-.33-.02-.5.14-.67.15-.15.33-.38.49-.58.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56l-.63-.01c-.22 0-.58.08-.88.41-.3.33-1.15 1.13-1.15 2.75s1.18 3.19 1.34 3.41c.16.22 2.32 3.54 5.62 4.96.78.34 1.4.54 1.88.69.79.25 1.51.21 2.08.13.63-.09 1.93-.79 2.21-1.56.27-.76.27-1.42.19-1.56-.08-.14-.3-.22-.63-.39z" />
      </svg>
    </button>
  </div>
</template>
