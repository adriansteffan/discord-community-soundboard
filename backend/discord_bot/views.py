from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

from rolepermissions.decorators import has_permission_decorator

import asyncio

from discord_bot.discord_interface.run_bot import bot


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@has_permission_decorator('play_sound_clip')
def playauth(request):

    # for testing purposes only, replace with calls to a specific module later
    cor = bot.get_channel(444809976435965963).send("hmmm")

    fut = asyncio.run_coroutine_threadsafe(cor, bot.loop)
    fut.result()

    return HttpResponse('Hello World')


@api_view(['GET'])
def playnoauth(request):
    # for testing purposes only, replace with calls to a specific module later
    cor = bot.get_channel(444809976435965963).send("hmmm")

    fut = asyncio.run_coroutine_threadsafe(cor, bot.loop)
    fut.result()

    return HttpResponse('Hello World')
