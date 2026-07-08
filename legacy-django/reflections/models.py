# reflections/models.py
from django.db import models
from django.utils.text import slugify


class Reflection(models.Model):
    title = models.CharField(max_length=200, verbose_name="Título")
    slug = models.SlugField(unique=True,
                            blank=True,
                            help_text="Automáticamente generado a partir del título."
                            )
    scripture = models.TextField(
        verbose_name="Texto bíblico",
        help_text="Ejemplo: Salmo 23:1–4 o el texto completo"
    )
    content = models.TextField(verbose_name="Cuerpo de la Reflexión")
    published_date = models.DateTimeField(auto_now_add=True)
    created = models.DateTimeField(verbose_name="Date")
    updated = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=False, verbose_name="Published")

    class Meta:
        ordering = ['-created']
        verbose_name = "Reflexión"
        verbose_name_plural = "Reflexiones"

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
