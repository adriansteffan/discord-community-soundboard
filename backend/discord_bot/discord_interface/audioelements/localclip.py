from discord_bot.discord_interface.audioelements.audioelement import AudioElement
from discord_bot.models import SoundClip
from django.db.models import F
import discord
import os

# Allows the bot to access the database in the async thread, rewrite on future implementation with asgi and channels
os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"


class LocalClip(AudioElement):

    def __init__(self, path):
        AudioElement.__init__(self)
        self.info = None
        self.path = path

    async def play(self, guild, voice_client, volume, next_song_callable):
        if os.path.exists(self.path):
            voice_client.play(discord.FFmpegPCMAudio(self.path), after=lambda e: next_song_callable(e))
            voice_client.source = discord.PCMVolumeTransformer(guild.voice_client.source)
            voice_client.source.volume = float(volume) / 100.0
            SoundClip.objects.filter(path=self.path).update(plays=F('plays')+1)


class LocalClipHelper:

    @staticmethod
    async def add_soundclip_from_name(audiocontroller, name):
        query = SoundClip.objects.filter(name=name)

        if not query.exists():
            return False

        clip = LocalClip(query[0].path)
        await LocalClipHelper._add_clip_to_controller(audiocontroller, clip)

        return True

    @staticmethod
    async def _add_clip_to_controller(audiocontroller, clip):
        audiocontroller.playlist.add(clip)
        if len(audiocontroller.playlist.playque) == 1:
            await audiocontroller.start_playback()

