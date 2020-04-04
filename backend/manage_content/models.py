from django.db import models

from discord_bot.models import Tag, SoundClip


class Collection(models.Model):
    name = models.TextField()
    sound_clips = models.ManyToManyField(SoundClip)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
