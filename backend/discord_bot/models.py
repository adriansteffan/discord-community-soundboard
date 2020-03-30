from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    title = models.TextField(unique=True)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title


class SoundClip(models.Model):
    name = models.TextField(unique=True)
    path = models.TextField(unique=True)
    duration = models.BigIntegerField()
    plays = models.BigIntegerField()
    creator = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    tags = models.ManyToManyField(Tag)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


