import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', component: () => import('@/pages/Home.vue') },
  { path: '/products', name: 'products', component: () => import('@/pages/Products.vue') },
  { path: '/team', name: 'team', component: () => import('@/pages/Team.vue') },
  { path: '/careers', name: 'careers', component: () => import('@/pages/Careers.vue') },
  { path: '/contact', name: 'contact', component: () => import('@/pages/Contact.vue') },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

// Set at build time: '/site/' when Frappe serves the app, '/' standalone.
const base = typeof __ROUTER_BASE__ === 'string' ? __ROUTER_BASE__ : '/'

export default createRouter({
  history: createWebHistory(base),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})
