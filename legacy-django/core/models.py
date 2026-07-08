from django.db import models

# Create your models here.


class Elder(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, default="Anciano gobernante")
    photo = models.ImageField(upload_to="elders/")
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["order"]


class Resource(models.Model):
    RESOURCE_TYPES = [
        ("article", "Artículo"),
        ("book", "Libro"),
        ("video", "Video"),
        ("audio", "Audio"),
        ("document", "Documento"),
    ]

    title = models.CharField(max_length=180, verbose_name="Título")
    description = models.TextField(verbose_name="Descripción")
    author = models.CharField(max_length=120, blank=True, verbose_name="Autor")
    resource_type = models.CharField(
        max_length=20,
        choices=RESOURCE_TYPES,
        default="article",
        verbose_name="Tipo",
    )
    url = models.URLField(verbose_name="Enlace")
    is_featured = models.BooleanField(default=False, verbose_name="Destacado")
    is_published = models.BooleanField(default=True, verbose_name="Publicado")
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_featured", "-created"]
        verbose_name = "Recurso"
        verbose_name_plural = "Recursos"

    def __str__(self):
        return self.title
