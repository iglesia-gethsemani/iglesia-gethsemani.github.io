from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path("", views.inicio, name="inicio"),
    path("nosotros/", views.nosotros, name="nosotros"),
    path("lo-que-creemos/", views.beliefs, name="beliefs"),
    path("recursos/", views.resources, name="resources"),
    path('contacto/', views.contact, name='contact'),

]
