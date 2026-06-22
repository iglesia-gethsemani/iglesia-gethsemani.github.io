# Iglesia Presbiteriana Reformada Gethsemaní

Sitio web de la Iglesia Presbiteriana Reformada Gethsemaní, ubicada en
Coyoacán, Ciudad de México. El proyecto presenta la identidad de la iglesia,
publica reflexiones y sermones, y ofrece información para visitantes.

## Características

- Página de inicio responsiva con horarios y reflexión destacada.
- Sección institucional y presentación del consistorio.
- Página doctrinal con las cinco solas de la Reforma.
- Credo de los Apóstoles y guía del Catecismo de Heidelberg.
- Publicación de reflexiones con navegación entre artículos.
- Conexión embebida con el canal oficial de YouTube y catálogo de sermones.
- Biblioteca administrable de recursos reformados.
- Animaciones discretas con soporte para preferencias de movimiento reducido.
- Información de contacto y mapa de ubicación.
- Panel de administración para gestionar el contenido.
- Diseño adaptable para escritorio, tabletas y teléfonos.

## Tecnologías

- Python 3.12 o posterior
- Django 6
- SQLite para desarrollo local
- HTML, CSS y JavaScript sin dependencias de frontend
- Pillow para gestionar las fotografías del consistorio

## Instalación local

1. Clona el repositorio y entra en su directorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd gethsemani_oficial
   ```

2. Crea y activa un entorno virtual:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Instala las dependencias:

   ```bash
   pip install -r requirements.txt
   ```

4. Prepara la base de datos:

   ```bash
   python manage.py migrate
   ```

5. Inicia el servidor de desarrollo:

   ```bash
   python manage.py runserver
   ```

El sitio estará disponible en <http://127.0.0.1:8000/>.

## Administración de contenido

Crea una cuenta administrativa la primera vez que prepares el proyecto:

```bash
python manage.py createsuperuser
```

Después visita <http://127.0.0.1:8000/admin/>. Desde el panel puedes gestionar:

- **Ancianos:** nombre, función, fotografía y orden de aparición.
- **Reflexiones:** título, pasaje bíblico, contenido y estado de publicación.
- **Sermones:** título, predicador, fecha y enlace de YouTube.

Una reflexión solo aparece en el sitio cuando la opción de publicación está
activada. Los videos aceptan enlaces habituales de `youtube.com`, `youtu.be` y
enlaces de inserción.

## Estructura del proyecto

```text
config/       Configuración principal y rutas globales
core/         Inicio, información institucional y contacto
reflections/  Reflexiones semanales
sermons/      Catálogo de sermones
media/        Archivos cargados desde el administrador (no versionados)
```

Las plantillas se encuentran dentro de cada aplicación. Los estilos globales
están en `core/static/core/css/style.css` y el comportamiento de navegación en
`core/static/core/js/site.js`.

## Comprobaciones

Antes de publicar cambios, ejecuta:

```bash
python manage.py check
python manage.py test
```

## Configuración para producción

La configuración incluida está orientada al desarrollo local. Antes de
publicar el sitio se debe:

- Definir `SECRET_KEY` mediante una variable de entorno.
- Desactivar `DEBUG`.
- Configurar `ALLOWED_HOSTS`.
- Servir archivos estáticos y multimedia desde el servidor correspondiente.
- Utilizar una base de datos y un servidor WSGI o ASGI apropiados.

## Licencia

Este proyecto se distribuye bajo los términos incluidos en [LICENSE](LICENSE).
