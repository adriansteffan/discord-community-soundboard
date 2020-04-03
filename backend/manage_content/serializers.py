from rest_framework import serializers
from manage_content import models


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Collection
        fields = ['id', 'name', 'sound_clips']


