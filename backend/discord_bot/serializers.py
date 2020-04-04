from rest_framework import serializers
from discord_bot import models


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tag
        fields = ['id', 'title']


class SoundClipSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.SoundClip
        fields = ['id', 'name', 'duration', 'tags']
