import { createRouter, createWebHistory } from 'vue-router'
import DeskView from '@/views/DeskView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'desk',
      component: DeskView,
    },
    {
      path: '/terminal',
      name: 'terminal',
      component: () => import('@/views/TerminalView.vue'),
    },
    {
      path: '/sobre',
      redirect: '/terminal',
    },
    {
      path: '/explorer',
      name: 'explorer',
      component: () => import('@/views/ExplorerView.vue'),
    },
    {
      path: '/proyectos',
      redirect: '/explorer',
    },
    {
      path: '/browser',
      name: 'browser',
      component: () => import('@/views/BrowserView.vue'),
    },
    {
      path: '/contacto',
      redirect: '/browser',
    },
    {
      path: '/tips',
      name: 'tips',
      component: () => import('@/views/TipsView.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
