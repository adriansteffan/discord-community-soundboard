from discord_bot.discord_interface.audioelements.audioelement import AudioElement
import discord

class LocalClip(AudioElement):

    def __init__(self, path):
        AudioElement.__init__(self)
        self.info = None
        self.path = path

    async def play(self, guild, voice_client, volume, next_song_callable):
        voice_client.play(discord.FFmpegPCMAudio(self.path), after=lambda e: next_song_callable(e))
        voice_client.source = discord.PCMVolumeTransformer(guild.voice_client.source)
        voice_client.source.volume = float(volume) / 100.0


class LocalClipHelper:

    @staticmethod
    async def add_soundclip_from_id(audiocontroller, clip_id):
        pass

    @staticmethod
    async def add_soundclip_from_name(audiocontroller, name):
        no_database_filepath = "clips/"
        clip = LocalClip(no_database_filepath+name+".mp3")
        await LocalClipHelper._add_clip_to_controller(audiocontroller, clip)

    @staticmethod
    async def _add_clip_to_controller(audiocontroller, clip):
        audiocontroller.playlist.add(clip)
        if len(audiocontroller.playlist.playque) == 1:
            await audiocontroller.start_playback()

