from django.shortcuts import render, get_object_or_404

# Create your views here.
from .models import Reflection


def reflection_list(request):
    reflections = Reflection.objects.filter(is_published=True)
    current = reflections.first()
    return render(request, 'reflections/reflection_list.html', {
        'reflection': current,
        'reflections': reflections
    })


def reflection_detail(request, slug):
    reflection = get_object_or_404(
        Reflection,
        slug=slug,
        is_published=True
    )
    previous_reflection = (
        Reflection.objects
        .filter(created__lt=reflection.created, is_published=True)
        .order_by('-created')
        .first()
    )

    next_reflection = (
        Reflection.objects
        .filter(created__gt=reflection.created, is_published=True)
        .order_by('created')
        .first()
    )

    return render(request, 'reflections/reflection_detail.html', {
        'reflection': reflection,
        'previous_reflection': previous_reflection,
        'next_reflection': next_reflection,
    })


def reflection_archive(request):
    reflections = Reflection.objects.filter(is_published=True)
    return render(request, 'reflections/archive.html', {
        'reflections': reflections
    })
