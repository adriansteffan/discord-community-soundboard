from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status

from backend.roles import has_permission, guild_check_decorator
from backend.utils import post_fields

import asyncio

from discord_bot.discord_interface.run_bot import bot


from discord_bot.discord_interface.audioelements.youtubesong import YoutubeHelper
from discord_bot.discord_interface.audioelements.localclip import LocalClipHelper
from discord_bot.discord_interface import utils


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@has_permission('play_sound_clip')
@post_fields(['guild_id', 'clip_name'])
@guild_check_decorator
def play_clip(request):

    guild = bot.get_guild(int(request.data['guild_id']))
    clip_name = request.data['clip_name']

    cor = LocalClipHelper.add_soundclip_from_name(
        utils.guild_to_audiocontroller[guild],
        clip_name
    )

    success = asyncio.run_coroutine_threadsafe(cor, bot.loop).result()
    if not success:
        return Response('The requested clip does not exist', status=status.HTTP_404_NOT_FOUND)
    return Response('Clip added to the queue', status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@has_permission('control_playback')
@post_fields(['guild_id', 'control'])
@guild_check_decorator
def control_playback(request):

    guild = bot.get_guild(int(request.data['guild_id']))
    control = request.data['control']
    print(control)

    cor = None

    if control == 'stop':
        cor = utils.guild_to_audiocontroller[guild].stop_player()

    elif control == 'pause':
        if guild.voice_client is None or not guild.voice_client.is_playing():
            return Response('Player is not playing', status=status.HTTP_404_NOT_FOUND)
        guild.voice_client.pause()

    elif control == 'resume':
        guild.voice_client.resume()

    elif control == 'skip':
        if guild.voice_client is None or (
                not guild.voice_client.is_paused() and not guild.voice_client.is_playing()):
            return Response('Nothing to skip', status=status.HTTP_404_NOT_FOUND)
        guild.voice_client.stop()

    elif control == 'prev':
        cor = utils.guild_to_audiocontroller[guild].prev_song()

    else:
        return Response('Invalid control command' + control, status=status.HTTP_404_NOT_FOUND)

    if cor:
        asyncio.run_coroutine_threadsafe(cor, bot.loop)
    return Response('Success', status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@has_permission('play_youtube')
@post_fields(['guild_id', 'track'])
@guild_check_decorator
def play_youtube(request):

    guild = bot.get_guild(int(request.data['guild_id']))
    track = request.data['track']
    audiocontroller = utils.guild_to_audiocontroller[guild]

    if track.isspace() or not track:
        return Response("Failure")

    cor = YoutubeHelper.add_yt_to_controller(audiocontroller, track)
    asyncio.run_coroutine_threadsafe(cor, bot.loop)

    return Response("Success")
