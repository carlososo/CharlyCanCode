import { createI18n } from 'vue-i18n'

const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('locale') : null

export const i18n = createI18n({
  legacy: false,
  locale: saved === 'en' ? 'en' : 'es',
  fallbackLocale: 'es',
  messages: {
    es: {
      lang: { tip: 'English', label: 'Cambiar a inglés' },
      switch: {
        tip: 'Modo oscuro',
        label: 'Cambiar a modo oscuro',
        tipOn: 'Modo claro',
        labelOn: 'Cambiar a modo claro',
      },
      about: 'Sobre mí',
      contact: 'Contacto',
      projects: 'Proyectos',
      tips: 'Dev Tips',
      pc: 'Este PC',
      files: 'Archivos',
      desktop: 'Escritorio',
      back: '← Volver al escritorio',
      folder: '← Carpeta',
      explorerEyebrow: 'Explorer · documentos',
      projectsPath: 'C:\\Users\\carlos\\Proyectos',
      projectNote: 'Stub hasta tener ficha real del proyecto.',
      browserEyebrow: 'Navegador',
      contactHeadline: '¿Hablamos?',
      contactLead:
        'Esta página es un stub de contacto. Cuando tengas el perfil listo, el enlace de abajo apuntará a tu LinkedIn real.',
      contactLink: 'Abrir LinkedIn',
      contactHint: 'Configurable en',
      shadeOpen: 'Abrir la ventana',
      shadeClose: 'Cerrar la ventana',
    },
    en: {
      lang: { tip: 'Español', label: 'Switch to Spanish' },
      switch: {
        tip: 'Dark mode',
        label: 'Switch to dark mode',
        tipOn: 'Light mode',
        labelOn: 'Switch to light mode',
      },
      about: 'About me',
      contact: 'Contact',
      projects: 'Projects',
      tips: 'Dev Tips',
      pc: 'This PC',
      files: 'Files',
      desktop: 'Desktop',
      back: '← Go Back to Desktop',
      folder: '← Folder',
      explorerEyebrow: 'Explorer · documents',
      projectsPath: 'C:\\Users\\carlos\\Projects',
      projectNote: 'Stub until the project has a real page.',
      browserEyebrow: 'Browser',
      contactHeadline: "Let's talk?",
      contactLead:
        'This page is a contact stub. When your profile is ready, the link below will point to your real LinkedIn.',
      contactLink: 'Open LinkedIn',
      contactHint: 'Set in',
      shadeOpen: 'Open the window',
      shadeClose: 'Close the window',
    },
  },
})
