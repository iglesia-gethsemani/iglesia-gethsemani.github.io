# Iglesia Presbiteriana Reformada Gethsemaní

Sitio web estático de la Iglesia Presbiteriana Reformada Gethsemaní, ubicada en Coyoacán, Ciudad de México. Presenta la identidad de la iglesia, publica reflexiones y sermones, y ofrece información para visitantes.

Este proyecto fue migrado de **Django** a **Astro** para publicarse gratuitamente en **GitHub Pages**, sin backend ni base de datos. El código Django original se conserva en [`legacy-django/`](legacy-django/).

## Características

- Página de inicio responsiva con horarios y acceso a sermones.
- Sección institucional y presentación del consistorio.
- Página doctrinal con las cinco solas de la Reforma.
- Credo de los Apóstoles y guía del Catecismo de Heidelberg.
- Reflexiones semanales administrables mediante archivos Markdown.
- Catálogo de sermones con videos embebidos de YouTube.
- Biblioteca de recursos reformados en Markdown.
- Animaciones discretas con soporte para `prefers-reduced-motion`.
- Información de contacto y mapa de ubicación.
- SEO básico: títulos, meta descriptions, Open Graph y sitemap.
- Despliegue automático a GitHub Pages con GitHub Actions.

## Tecnologías

- [Astro](https://astro.build/) 5
- TypeScript
- Content Collections (Markdown)
- CSS y JavaScript sin framework frontend
- GitHub Pages + GitHub Actions

## Instalación local

Requisitos: Node.js 20 o posterior.

```bash
git clone https://github.com/josuerdgz/webside_gethsemani.git
cd webside_gethsemani
git checkout migration/astro-github-pages
npm install
```

## Ejecutar en local

```bash
npm run dev
```

El sitio estará disponible en <http://localhost:4321/>.

Para simular la ruta base de un repositorio de proyecto en GitHub Pages:

```bash
BASE_PATH=/webside_gethsemani/ npm run dev
```

## Compilar y previsualizar

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```text
src/
  components/       Componentes reutilizables (Header, Footer, YouTube)
  content/
    reflections/    Reflexiones en Markdown
    sermons/        Sermones en Markdown
    resources/      Recursos en Markdown
  data/             Datos estáticos (consistorio)
  layouts/          Plantillas base
  pages/            Rutas del sitio
  utils/            Utilidades (rutas, YouTube)
public/
  images/           Imágenes estáticas
  styles/           CSS global
  scripts/          JavaScript del sitio
legacy-django/      Respaldo del proyecto Django original
.github/workflows/  Despliegue automático a GitHub Pages
```

## Cómo agregar contenido

El contenido dinámico ya no usa el panel `/admin/` de Django. Se administra editando archivos Markdown en `src/content/`.

### Agregar una reflexión

1. Crea un archivo en `src/content/reflections/`, por ejemplo `mi-reflexion.md`.
2. Usa este frontmatter:

```yaml
---
title: Título de la reflexión
date: 2025-07-08
description: Breve descripción para SEO y listados.
passage: Salmo 23:1–4
author: Nombre del autor
published: true
order: 1
---
```

3. Escribe el cuerpo de la reflexión debajo del frontmatter en Markdown.
4. La URL será `/reflexiones/mi-reflexion/`.

> Hay una plantilla de ejemplo en `src/content/reflections/ejemplo-reflexion.md` (con `published: false`).

### Agregar un sermón

1. Crea un archivo en `src/content/sermons/`, por ejemplo `nuevo-sermon.md`.
2. Usa este frontmatter:

```yaml
---
title: Título del sermón
date: 2025-07-08
description: Descripción breve del mensaje.
passage: Romanos 8:1–4
preacher: Pr. Nombre Apellido
youtubeUrl: https://www.youtube.com/watch?v=VIDEO_ID
category: sermon
published: true
order: 7
---
```

Categorías disponibles: `sermon`, `worship`, `conference`, `full-service`, `sacrament`.

### Agregar un recurso

1. Crea un archivo en `src/content/resources/`, por ejemplo `nuevo-recurso.md`.
2. Usa este frontmatter:

```yaml
---
title: Título del recurso
description: Descripción del material recomendado.
author: Autor o fuente
resourceType: article
url: https://ejemplo.org/recurso
published: true
featured: false
order: 2
---
```

Tipos disponibles: `article`, `book`, `video`, `audio`, `document`.

### Actualizar el consistorio

Edita `src/data/elders.ts` con nombre, función y ruta de fotografía. Las imágenes van en `public/images/elders/`.

> **Pendiente:** Los nombres del consistorio deben completarse manualmente. Las fotografías provienen del respaldo en `legacy-django/elders/`, pero la base de datos no estaba versionada.

## Publicar cambios

1. Haz commit y push a la rama principal (o a `migration/astro-github-pages` durante la transición).
2. GitHub Actions compilará el sitio y lo publicará en GitHub Pages.
3. Verifica la URL pública después del despliegue.

## Cómo funciona GitHub Pages

- El workflow en `.github/workflows/deploy.yml` instala dependencias, compila con `npm run build` y sube `dist/` a GitHub Pages.
- La variable `BASE_PATH` se calcula automáticamente:
  - Repo `iglesia-gethsemani.github.io` → sitio en la raíz (`/`)
  - Cualquier otro nombre de repo → sitio en `/<nombre-del-repo>/`
- URL esperada de la organización: <https://iglesia-gethsemani.github.io/>

## Pasos manuales en GitHub

### 1. Crear la organización

1. En GitHub, ve a **Settings → Organizations → New organization**.
2. Crea la organización `iglesia-gethsemani` (o el nombre acordado por el consistorio).
3. Invita a los administradores necesarios.

### 2. Transferir el repositorio

1. En el repositorio actual (`josuerdgz/webside_gethsemani`), ve a **Settings → General → Danger Zone → Transfer ownership**.
2. Transfiere el repositorio a la organización `iglesia-gethsemani`.
3. Opcional: renombra el repo a `iglesia-gethsemani.github.io` para publicar en la raíz del dominio de la organización.

### 3. Activar GitHub Pages

1. En el repositorio transferido, ve a **Settings → Pages**.
2. En **Build and deployment → Source**, selecciona **GitHub Actions**.
3. No uses “Deploy from a branch” — el workflow ya publica el artefacto compilado.

### 4. Configurar Actions

1. Ve a **Settings → Actions → General**.
2. Permite que los workflows ejecuten despliegues a GitHub Pages.
3. El workflow `Deploy to GitHub Pages` se ejecutará en cada push a `main`.

### 5. Confirmar la URL pública

- Si el repo se llama `iglesia-gethsemani.github.io`: <https://iglesia-gethsemani.github.io/>
- Si conservas el nombre `webside_gethsemani`: <https://iglesia-gethsemani.github.io/webside_gethsemani/>

## Contenido pendiente de migrar

| Elemento | Estado |
|----------|--------|
| Reflexiones del panel Django | Pendiente — no había `db.sqlite3` versionada. Usa la plantilla Markdown. |
| Nombres del consistorio | Pendiente — completar en `src/data/elders.ts`. |
| Recursos del panel Django | Parcial — 1 recurso de ejemplo; agregar el resto manualmente. |
| Sermones del panel Django | Migrados los 6 videos hardcodeados de la plantilla original. |

## Proyecto Django original

El código Django 6 se conserva en [`legacy-django/`](legacy-django/). Consulta su README para ejecutarlo como referencia histórica.

## Licencia

Este proyecto se distribuye bajo los términos incluidos en [LICENSE](LICENSE).
