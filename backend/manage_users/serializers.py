from rest_framework import serializers
from manage_users import models


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Profile
        fields = ['id', 'playlists', 'guilds']


class GuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Guild
        fields = ['id', 'name']
