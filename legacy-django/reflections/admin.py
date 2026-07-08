from django.contrib import admin
from django import forms
# Register your models here.
# reflections/admin.py
from .models import Reflection
from django.db import models


class ReflectionAdminForm(forms.ModelForm):
    class Meta:
        model = Reflection
        fields = '__all__'
        widgets = {
            'content': forms.Textarea(attrs={
                'rows': 20,
                'cols': 100,
                'style': 'font-size: 15px; line-height: 1.6;'
            }),
        }


@admin.register(Reflection)
class ReflectionAdmin(admin.ModelAdmin):
    list_display = ('title', 'published_date', 'is_published')
    list_filter = ('is_published', 'published_date')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'content')
    date_hierarchy = 'created'
    ordering = ('-created',)

    fieldsets = (
        ('Main content', {
            'fields': ('title', 'slug', 'scripture', 'content')
        }),

        ('Publication', {
            'fields': ('created', 'is_published'),
            'classes': ('collapse',),
        }),
    )

    formfield_overrides = {
        models.TextField: {'widget': admin.widgets.AdminTextareaWidget(attrs={
            'rows': 20,
            'style': 'font-family: Georgia; font-size: 15px;'
        })},
    }
