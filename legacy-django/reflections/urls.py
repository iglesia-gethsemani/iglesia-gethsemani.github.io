from django.urls import path
from . import views

app_name = 'reflections'

urlpatterns = [
    path('', views.reflection_list, name='reflection_list'),
    path('<slug:slug>/', views.reflection_detail, name='reflection_detail'),
]
