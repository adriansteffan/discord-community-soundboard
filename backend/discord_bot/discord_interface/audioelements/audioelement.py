from abc import ABC, abstractmethod


class AudioElement(ABC):

    def __init__(self):
        self.info = None

    @abstractmethod
    def play(self, guild, voice_client, volume, next_song):
        pass
