# Carlos — página personal interactiva

SPA en Vue 3 con una escena de escritorio: un monitor ultrawide de frente, ventanas clicables y un “monito” de espaldas en silla gamer cuya cabeza/cabello sigue el cursor.

## Stack

- Vue 3 + Vite + TypeScript
- Vue Router
- Tailwind CSS v4 (`@tailwindcss/vite`)

## Arranque local

Requisitos: Node `^22.18.0` o `>=24.12.0`.

```bash
npm install
npm run dev
```

La app queda en [http://127.0.0.1:43123](http://127.0.0.1:43123).

Otros scripts:

```bash
npm run build
npm run preview
npm run type-check
```

## Escena (v1)

- Fondo atmosférico azul suave
- Monitor ~75vw × ~60vh con ventanas a **Sobre mí**, **Proyectos** y **Contacto**
- Personaje SVG de espaldas; idle mirando el monitor; el puntero actúa como distracción
- En móvil: composición legible + balanceo idle si no hay ratón
