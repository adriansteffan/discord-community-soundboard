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
    duration = models.FloatField()
    plays = models.BigIntegerField(default=0)
    creator = models.ForeignKey(User, default=None, null=True, on_delete=models.SET_NULL)
    tags = models.ManyToManyField(Tag)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class Guild(models.Model):
    id = models.TextField(primary_key=True)
    name = models.TextField()
    connected_channel = models.TextField()

    class Meta:
        ordering = ['id']

    def __str__(self):
        return self.id


