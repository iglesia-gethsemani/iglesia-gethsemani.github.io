# Iglesia Presbiteriana Reformada Gethsemaní

Sitio web estático de la Iglesia Presbiteriana Reformada Gethsemaní, ubicada en Coyoacán, Ciudad de México.

## Tecnologías

- Astro 5 y TypeScript
- Content Collections con Markdown
- CSS y JavaScript sin framework frontend
- GitHub Pages con publicación automática

## Desarrollo local

Requiere Node.js 22 o posterior.

```bash
npm install
npm run dev
```

Comprobaciones antes de publicar:

```bash
npm run check
npm run build
```

## Estructura

```text
src/
  components/       Componentes reutilizables
  content/
    doctrine/       Catecismos, confesiones y cánones
    reflections/    Reflexiones semanales
    sermons/        Sermones y cultos en video
    service-orders/ Órdenes del culto dominical
  data/             Datos del consistorio, sociedades y YouTube
  layouts/          Plantillas generales
  pages/            Rutas públicas
  utils/            Utilidades compartidas
public/
  docs/             Documentos descargables
  images/           Imágenes públicas
  scripts/          Interacciones del sitio
  styles/           Estilos globales
```

## Agregar contenido

### Reflexión

Crea un archivo Markdown en `src/content/reflections/`:

```yaml
---
title: Título de la reflexión
date: 2026-07-23
description: Breve descripción
passage: Salmo 23:1–4
author: Nombre del autor
published: true
order: 1
---
```

La URL se genera a partir del nombre del archivo. La plantilla `ejemplo-reflexion.md` no se publica.

### Sermón

Crea un archivo Markdown en `src/content/sermons/`:

```yaml
---
title: Título del sermón
date: 2026-07-23
description: Descripción breve
passage: Romanos 8:1–4
preacher: Nombre del predicador
youtubeUrl: https://www.youtube.com/watch?v=VIDEO_ID
category: sermon
published: true
order: 1
---
```

Categorías válidas: `sermon`, `study`, `worship`, `conference`, `full-service` y `sacrament`.

### Documento doctrinal

Crea el archivo en `src/content/doctrine/` con los campos `title`, `shortTitle`, `description`, `kind`, `tradition`, `order` y `published`. Los valores válidos de `kind` son `Catecismo`, `Confesión de fe` y `Cánones`.

### Orden del culto

Duplica `src/content/service-orders/plantilla-orden-del-culto.md`, cambia la fecha y los elementos, y establece `published: true`. La página principal muestra el orden más reciente y conserva los anteriores en su archivo.

El código QR público siempre dirige a:

<https://iglesia-gethsemani.github.io/orden-del-culto/>

### Datos institucionales

- Consistorio: `src/data/elders.ts`
- Sociedades: `src/data/societies.ts`
- Canal de YouTube: `src/data/youtube.ts`

## Publicación

Cada cambio enviado a la rama `main` activa `.github/workflows/deploy.yml`, compila el sitio y publica `dist/` en:

<https://iglesia-gethsemani.github.io/>

## Licencia

Este proyecto se distribuye bajo los términos incluidos en [LICENSE](LICENSE).
