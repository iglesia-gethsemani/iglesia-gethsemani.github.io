from django.contrib import admin

# Register your models here.
# core/admin.py
from django.contrib import admin
from .models import Elder, Resource


@admin.register(Elder)
class ElderAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order")


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ("title", "resource_type", "author", "is_featured", "is_published")
    list_filter = ("resource_type", "is_featured", "is_published")
    search_fields = ("title", "description", "author")
