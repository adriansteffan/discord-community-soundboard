from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.authtoken.models import Token
from rest_framework import status
from rolepermissions.permissions import available_perm_status
from rolepermissions.roles import get_user_roles

from backend.roles import has_permission
from backend.utils import post_fields
from discord_bot.serializers import SoundClipSerializer, TagSerializer
from discord_bot.models import SoundClip, Tag

from manage_users.serializers import GuildSerializer, ProfileSerializer
from manage_users.models import Guild, Profile

from manage_content.serializers import CollectionSerializer
from manage_content.models import Collection

import re
import inspect, os


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def fetch_data(request):
    profile = Profile.objects.filter(user=request.user).prefetch_related('guilds')[0]

    guilds = GuildSerializer(profile.guilds, many=True).data
    collections = CollectionSerializer(profile.playlists, many=True).data

    sound_clips = SoundClipSerializer(SoundClip.objects.all(), many=True).data
    tags = SoundClipSerializer(Tag.objects.all(), many=True).data

    data = {
        'roles': list(map(lambda x: x.__name__.lower(), list(get_user_roles(request.user)))),
        'permissions': dict(available_perm_status(request.user)),
        'guilds': guilds,
        'collections': collections,
        'tags': tags,
        'sound_clips': sound_clips,
    }
    return JsonResponse(data, safe=False)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@has_permission('manage_tags')
@post_fields(['name'])
def create_tag(request):
    name = request.data['name']

    if not len(Tag.objects.filter(title=name)) == 0:
        return Response('Tag already exists.', status=status.HTTP_409_CONFLICT)

    # check if tag consists of at least 1 regular character with regex
    if not bool(re.fullmatch(r'\w+', name)):
        return Response('Tag is invalid.', status=status.HTTP_400_BAD_REQUEST)

    Tag(title=name).save()

    return Response('Tag uploaded successfully.', status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@has_permission('manage_tags')
@post_fields(['name'])
def delete_tag(request):
    name = request.data['name']

    if len(Tag.objects.filter(title=name)) == 0:
        return Response('Tag does not exist.', status=status.HTTP_404_NOT_FOUND)

    Tag.objects.filter(title=name).delete()

    return Response('Tag deleted successfully.', status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@has_permission('manage_tags')
@post_fields(['sound_clip', 'tag'])
def add_tag(request):
    tag_title = request.data['tag']
    sound_clip = request.data['sound_clip']

    if not Tag.objects.filter(title=tag_title).exists():
        return Response('Tag does not exist.', status=status.HTTP_404_NOT_FOUND)

    if not SoundClip.objects.filter(name=sound_clip).exists():
        return Response('Sound clip does not exist.', status=status.HTTP_404_NOT_FOUND)

    tag = Tag.objects.filter(title=tag_title)[0]
    clip = SoundClip.objects.filter(name=sound_clip)[0].tags

    if tag in clip.all():
        return Response("'{clip}' already has the tag '{tag}'.".format(clip=sound_clip, tag=tag_title),
                        status=status.HTTP_409_CONFLICT)

    clip.add(tag)

    return Response("Tag '{tag}' successfully added to '{clip}'.".format(clip=sound_clip, tag=tag_title),
                    status=status.HTTP_200_OK)


# TODO need form-data POST request to upload a file
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
# @has_permission('upload_sound_clip')
# @post_fields(['name', 'file', 'tags'])
def upload_sound_clip(request):
    name = request.data['name']
    file = request.data['file']
    tags = request.data['tags']

    #file_path = open(r'C:\Dokumente', 'w')
    #file_path.write(file)
    #file_path.close()

    return Response("File '{}' uploaded successfully".format(name))
