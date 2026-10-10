import { nextTick } from 'vue'
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

let finishMorph: (() => void) | null = null

router.afterEach(() => {
  const finish = finishMorph
  finishMorph = null
  if (!finish) return
  nextTick(() => nextTick(finish))
})

router.beforeEach((to, from) => {
  const morph = from.name === 'desk' || to.name === 'desk'
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!morph || reduced || from.name === to.name || !document.startViewTransition) return

  return new Promise<void>((resolve) => {
    document.startViewTransition(() => {
      return new Promise<void>((done) => {
        const timer = window.setTimeout(done, 1200)
        finishMorph = () => {
          window.clearTimeout(timer)
          done()
        }
        resolve()
      })
    })
  })
})

export default router
