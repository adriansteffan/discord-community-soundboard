from discord_bot.discord_interface.config import config
from discord_bot.discord_interface.playlist import Playlist
from discord_bot.discord_interface.audioelements.dummy import Dummy


class AudioController(object):
    """ Controls the playback of audio and the sequential playing of the songs.

            Attributes:
                bot: The instance of the bot that will be playing the music.
                _volume: the volume of the music being played.
                playlist: A Playlist object that stores the history and queue of songs.
                current_songinfo: A Songinfo object that stores details of the current song.
                guild: The guild in which the Audiocontroller operates.
        """

    def __init__(self, bot, guild, volume):
        self.bot = bot
        self._volume = volume
        self.playlist = Playlist()
        self.guild = guild
        self.voice_client = None

    @property
    def volume(self):
        return self._volume

    @volume.setter
    def volume(self, value):
        self._volume = value
        try:
            self.voice_client.source.volume = float(value) / 100.0
        except Exception as e:
            print(e)
        
    async def register_voice_channel(self, channel):
        try:
            self.voice_client = await channel.connect(timeout=30.0)
        except Exception as e:
            # TODO send message to discord server
            pass

    def next_song(self, error):
        """Invoked after a song is finished. Plays the next song if there is one"""

        next_audio = self.playlist.next()

        if next_audio is not None:
            coro = next_audio.play(self.guild, self.voice_client, self.volume, self.next_song)
            self.bot.loop.create_task(coro)

    async def start_playback(self):
        """Starts the first song in the playlist"""
        await self.playlist.playque[0].play(self.guild, self.voice_client, self.volume, self.next_song)

    async def stop_player(self):
        """Stops the player and removes all songs from the queue"""
        if self.guild.voice_client is None or (
                not self.guild.voice_client.is_paused() and not self.guild.voice_client.is_playing()):
            return
        self.playlist.next()
        self.playlist.playque.clear()
        self.guild.voice_client.stop()
        await self.guild.me.edit(nick=config.DEFAULT_NICKNAME)

    async def prev_song(self):
        """Loads the last ong from the history into the queue and starts it"""
        if len(self.playlist.playhistory) == 0:
            return None
        if self.guild.voice_client is None or (
                not self.guild.voice_client.is_paused() and not self.guild.voice_client.is_playing()):
            prev_song = self.playlist.prev()
            # The Dummy is used if there is no song in the history to replay the current song on prev
            if isinstance(prev_song, Dummy):
                self.playlist.next()
                return None
            await prev_song.play(self.guild, self.voice_client, self.volume, self.next_song)
        else:
            self.playlist.prev()
            self.playlist.prev()
            self.guild.voice_client.stop()
