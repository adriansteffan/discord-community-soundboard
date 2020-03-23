from django.http import HttpResponse
import asyncio

from discord_bot.discord_interface.run_bot import bot


def test(request):

    # for testing purposes only, replace with calls to a specific module later
    cor = bot.get_channel(444809976435965963).send("hmmm")

    fut = asyncio.run_coroutine_threadsafe(cor, bot.loop)
    fut.result()

    return HttpResponse('Hello World')
