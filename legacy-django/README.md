# Proyecto Django original (respaldo)

Este directorio conserva el sitio Django original de la Iglesia Presbiteriana Reformada Gethsemaní antes de la migración a Astro.

## Contenido

- `config/` — Configuración principal y rutas globales
- `core/` — Inicio, información institucional, contacto y recursos
- `reflections/` — Reflexiones semanales
- `sermons/` — Catálogo de sermones
- `elders/` — Fotografías del consistorio (sin metadatos en base de datos versionada)
- `manage.py` — Punto de entrada de Django
- `requirements.txt` — Dependencias Python

## Recuperar desde Git

Si necesitas volver a este código en cualquier momento:

```bash
git checkout main -- legacy-django/
# o revisa un commit anterior:
git log --oneline -- legacy-django/
```

## Ejecutar localmente (solo referencia histórica)

```bash
cd legacy-django
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

> **Nota:** La base de datos `db.sqlite3` y la carpeta `media/` no estaban versionadas. Si tienes un respaldo local del panel `/admin/`, expórtalo manualmente a archivos Markdown en el sitio Astro.
