from django.db import models

# Create your models here.
from django.db import models
import urllib.parse


class Sermon(models.Model):
    title = models.CharField(max_length=200)
    preacher = models.CharField(max_length=100, blank=True)
    youtube_url = models.URLField()
    date = models.DateField()
    created = models.DateTimeField(auto_now_add=True)

    @property
    def youtube_id(self):
        url = self.youtube_url

        if "youtu.be/" in url:
            return url.split("youtu.be/")[-1].split("?")[0]

        if "youtube.com/embed/" in url:
            return url.split("embed/")[-1].split("?")[0]

        parsed = urllib.parse.urlparse(url)
        query = urllib.parse.parse_qs(parsed.query)
        return query.get("v", [""])[0]

    class Meta:
        ordering = ['-date']

    def __str__(self):
        return f"{self.title} ({self.date})"
