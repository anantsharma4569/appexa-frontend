// All site content comes from the appexa Frappe app. The endpoints are
// whitelisted for Guest and return published records only.
import { createResource, frappeRequest, setConfig } from 'frappe-ui'

setConfig('resourceFetcher', frappeRequest)

const method = (name) => `appexa.api.website.${name}`

/** Everything the site needs, in a single request. */
export const siteContent = createResource({
  url: method('get_home'),
  cache: 'appexa:home',
  auto: true,
})

export const submitEnquiry = createResource({
  url: method('submit_enquiry'),
})

/** Turn a Frappe file field into a usable URL. */
export function fileUrl(value) {
  if (!value) return ''
  return value.startsWith('http') ? value : value
}

/** Frappe sends its validation messages back as JSON in _server_messages. */
export function errorMessage(error) {
  const fallback = 'Something went wrong. Please try again, or call us instead.'
  if (!error) return fallback
  const messages = error.messages
  if (Array.isArray(messages) && messages.length) return messages.join(' ')
  return error.message || fallback
}
