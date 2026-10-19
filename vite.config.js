import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import frappeui from 'frappe-ui/vite'

// The Frappe backend. Override with FRAPPE_BACKEND / FRAPPE_SITE when your
// bench runs on another port or you work against a different site.
const backend = process.env.FRAPPE_BACKEND || 'http://127.0.0.1:8003'
const site = process.env.FRAPPE_SITE || 'apexxa.localhost'
const outDir = process.env.FRAPPE_OUT || ''

// Frappe resolves the site from the Host header, so the proxy sends the site
// name rather than localhost:8080.
const toFrappe = {
  target: backend,
  changeOrigin: false,
  headers: { Host: site },
}

export default defineConfig({
  plugins: [
    // frappe-ui's components reference ~icons/lucide/*, so its icon resolver has
    // to run. The proxy and build output are configured below instead, because
    // this repo lives outside the bench directory.
    frappeui({
      lucideIcons: true,
      frappeProxy: false,
      jinjaBootData: false,
      buildConfig: false,
    }),
    vue(),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 8080,
    proxy: {
      '/api': toFrappe,
      '/files': toFrappe,
      '/private': toFrappe,
      '/assets': toFrappe,
      '/app': toFrappe,
    },
  },
  // Build to dist/ for standalone hosting. Set FRAPPE_OUT to the appexa app's
  // public/frontend directory to have Frappe serve the site instead — see the
  // README. The asset base has to match, hence the two cases.
  base: outDir ? '/assets/appexa/frontend/' : '/',
  build: {
    outDir: outDir || 'dist',
    emptyOutDir: true,
    target: 'es2015',
    // site.py reads the hashed asset names out of this.
    manifest: true,
  },
  // Assets and routes live at different paths, so the router gets its own base:
  // Frappe serves the pages under /site, standalone hosting serves them at root.
  define: {
    __ROUTER_BASE__: JSON.stringify(outDir ? '/site/' : '/'),
  },
})
