// All site content comes from the appexa Frappe app. The endpoints are
// whitelisted for Guest and return published records only.
import { createResource, setConfig } from 'frappe-ui'

// Where the Frappe backend lives, without a trailing slash.
//
// Empty means same origin: the Vite dev proxy during development, or Frappe
// serving the built site itself. Deploying the frontend on its own — Vercel,
// Netlify — needs VITE_FRAPPE_URL set to the backend, e.g.
// https://appexa.frappe.cloud, and that origin allowed via allow_cors in the
// site config.
export const BACKEND = (import.meta.env.VITE_FRAPPE_URL || '').replace(/\/+$/, '')

/**
 * frappe-ui's own fetcher sends X-Frappe-Site-Name taken from the browser's
 * hostname, which Frappe trusts ahead of the Host header when resolving which
 * site to serve. Cross-origin that name is the frontend's domain, not the
 * site's, so every request would 404. This fetcher leaves the header off and
 * lets Frappe resolve the site normally.
 *
 * Guest sessions carry no CSRF token, and Frappe skips the check for them, so
 * none is sent. Credentials are omitted too: the public site never needs them.
 */
async function fetcher({ url, params, method = 'POST' }) {
  const endpoint = url.startsWith('http') ? url : `${BACKEND}/api/method/${url}`

  const response = await fetch(endpoint, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: method === 'GET' ? undefined : JSON.stringify(params || {}),
  })

  const payload = await response.json().catch(() => ({}))

  if (!response.ok) {
    // Frappe returns its validation messages as JSON strings in _server_messages.
    let detail = ''
    try {
      const messages = JSON.parse(payload._server_messages || '[]')
      detail = messages.map((m) => JSON.parse(m).message).join(' ')
    } catch {
      // Not a validation error — fall back to the generic message below.
    }
    const error = new Error(detail || payload.exception || `Request failed (${response.status})`)
    error.status = response.status
    throw error
  }

  return payload.message
}

setConfig('resourceFetcher', fetcher)

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

/**
 * Frappe stores attachments as site-relative paths such as /files/photo.png.
 * Served from another domain those would resolve against the frontend, so they
 * need the backend in front.
 */
export function fileUrl(value) {
  if (!value) return ''
  if (value.startsWith('http') || value.startsWith('data:')) return value
  return `${BACKEND}${value.startsWith('/') ? '' : '/'}${value}`
}

export function errorMessage(error) {
  const fallback = 'Something went wrong. Please try again, or call us instead.'
  return error?.message || fallback
}
