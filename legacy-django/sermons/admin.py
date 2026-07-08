from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Sermon


@admin.register(Sermon)
class SermonAdmin(admin.ModelAdmin):
    list_display = ('title', 'date', 'preacher')
    list_filter = ('date',)
    search_fields = ('title', 'preacher')
    date_hierarchy = 'date'
