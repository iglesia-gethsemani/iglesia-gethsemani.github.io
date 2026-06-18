from django.shortcuts import render
from reflections.models import Reflection
from .models import Elder, Resource


def inicio(request):
    reflection = (
        Reflection.objects
        .filter(is_published=True)
        .first()
    )
    return render(request, 'core/inicio.html', {
        'reflection': reflection
    })


def nosotros(request):
    elders = Elder.objects.all()
    return render(request, "core/nosotros.html", {
        "elders": elders
    })


def contact(request):
    return render(request, 'core/contact.html')


def beliefs(request):
    return render(request, 'core/beliefs.html')


def resources(request):
    published_resources = Resource.objects.filter(is_published=True)
    return render(request, 'core/resources.html', {
        'resources': published_resources,
    })
