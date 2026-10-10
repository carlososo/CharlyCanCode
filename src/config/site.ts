/** Easy-to-edit public links and stub content for Carlos. */

export const LINKEDIN_URL = 'https://www.linkedin.com/'

export const projects = [
  {
    id: 'carlos-page',
    name: 'Carlos Page',
    ext: 'vue',
    summary: 'SPA interactiva del escritorio: monito, monitor y ventanas a pantalla completa.',
    stack: 'Vue 3 · Vite · TypeScript',
  },
  {
    id: 'notas-ia',
    name: 'Notas IA',
    ext: 'md',
    summary: 'Cuaderno local que resume notas con un modelo pequeño y guarda el contexto en el dispositivo.',
    stack: 'TypeScript · WebGPU (stub)',
  },
  {
    id: 'pipeline-ci',
    name: 'Pipeline CI',
    ext: 'yml',
    summary: 'Plantilla de CI para frontends Vue/React con lint, typecheck y preview efímero.',
    stack: 'GitHub Actions · pnpm',
  },
  {
    id: 'cli-tips',
    name: 'cli-tips',
    ext: 'sh',
    summary: 'Colección de aliases y scripts para acelerar el día a día en la terminal.',
    stack: 'Bash · Zsh',
  },
] as const

export const terminalScript = [
  '$ whoami',
  'carlos',
  '',
  '$ cat ~/sobre-mi.txt',
  'Hola — soy Carlos. Este terminal es un stub hasta que pegue bio real.',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod',
  'tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
  'quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
  '',
  '$ ls skills/',
  'vue/  typescript/  ui/  ia-asistida/',
  '',
  '$ echo "Más info pronto — edita src/config/site.ts"',
  'Más info pronto — edita src/config/site.ts',
  '',
  '$ ▌',
] as const

export const devTips = [
  {
    title: 'El contexto gana al prompt mágico',
    body: 'En 2026, los agentes rinden mejor con repos limpios, README cortos y ejemplos ejecutables. Invierte en contexto, no en prompts kilométricos.',
  },
  {
    title: 'Typecheck antes de pedir un refactor',
    body: 'Pasa `vue-tsc` / `tsc` en verde antes de pedirle a la IA un cambio grande. Menos alucinaciones de tipos = menos idas y vueltas.',
  },
  {
    title: 'Diffs pequeños, merges frecuentes',
    body: 'Pide cambios acotados (un componente, un endpoint). Los PRs enormes generados por IA son difíciles de revisar y fáciles de romper.',
  },
  {
    title: 'Evalúa lo no determinista',
    body: 'Si usas LLM en producto, deja un eval mínimo (casos fijos + score). Sin medición, “mejoró” es solo una sensación.',
  },
  {
    title: 'La UI también es especificación',
    body: 'Un mock navegable o una escena interactiva (como este escritorio) comunica intención mejor que un documento de 12 páginas.',
  },
  {
    title: 'No externalices el juicio',
    body: 'La IA acelera; tú decides arquitectura, seguridad y qué no construir. Lazy senior: menos código, más criterio.',
  },
] as const
