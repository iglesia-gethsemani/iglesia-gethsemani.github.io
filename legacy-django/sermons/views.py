from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from .models import Sermon


def sermon_list(request):
    sermons = Sermon.objects.all()
    return render(request, 'sermons/sermon_list.html', {
        'sermons': sermons
    })
