from discord_bot.discord_interface.audioelements.audioelement import AudioElement


class Dummy(AudioElement):

    def __init__(self):
        AudioElement.__init__(self)
        self.info = None

    def play(self, guild, voice_client, volume, next_song):
        pass
