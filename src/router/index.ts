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
      path: '/sobre',
      name: 'sobre',
      component: () => import('@/views/StubPage.vue'),
      meta: {
        title: 'Sobre mí',
        blurb: 'Un rincón para contar quién soy y qué me gusta construir.',
      },
    },
    {
      path: '/proyectos',
      name: 'proyectos',
      component: () => import('@/views/StubPage.vue'),
      meta: {
        title: 'Proyectos',
        blurb: 'Ventanas abiertas con ideas, experimentos y cosas hechas.',
      },
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: () => import('@/views/StubPage.vue'),
      meta: {
        title: 'Contacto',
        blurb: 'Si quieres saludar, este es el canal. Pronto habrá más formas.',
      },
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
