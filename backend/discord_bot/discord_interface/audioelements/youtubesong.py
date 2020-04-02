from discord_bot.discord_interface.audioelements.audioelement import AudioElement
from discord_bot.discord_interface.audioelements.yt_songinfo import YtSonginfo

import discord
import youtube_dl
import urllib
from string import printable

from bs4 import BeautifulSoup


class YoutubeSong(AudioElement):

    def __init__(self, link):
        AudioElement.__init__(self)
        self.info = None
        self._link = link

    async def play(self, guild, voice_client, volume, next_song_callable):
        """Downloads and plays the audio of the youtube link passed"""

        youtube_link = self._link.split("&list=")[0]

        try:
            ydl_opts = {
                'format': 'bestaudio/best',
                'title': True,
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'mp3',
                    'preferredquality': '192',
                }],

            }
            downloader = youtube_dl.YoutubeDL(ydl_opts)
            extracted_info = downloader.extract_info(youtube_link, download=False)
        # "format" is not available for livestreams - redownload the page with no options
        except:
            try:
                downloader = youtube_dl.YoutubeDL({})
                extracted_info = downloader.extract_info(youtube_link, download=False)

            except:
                next_song_callable(None)
                return

        # Update the songinfo to reflect the current song
        self.info = YtSonginfo(extracted_info.get('uploader'), extracted_info.get('creator'),
                                         extracted_info.get('title'), extracted_info.get('duration'),
                                         extracted_info.get('like_count'), extracted_info.get('dislike_count'),
                                         extracted_info.get('webpage_url'))

        voice_client.play(discord.FFmpegPCMAudio(extracted_info['url']), after=lambda e: next_song_callable(e))
        voice_client.source = discord.PCMVolumeTransformer(guild.voice_client.source)
        voice_client.source.volume = float(volume) / 100.0


class YoutubeHelper:

    @staticmethod
    async def add_yt_to_controller(audiocontroller, track):

            """Adds the track to the playlist instance and plays it, if it is the first song"""

            # If the track is a video title, get the corresponding video link first
            if not ("watch?v=" in track):
                link = YoutubeHelper._convert_to_youtube_link('"' + track + '"')
                if link is None:
                    link = YoutubeHelper._convert_to_youtube_link(track)
                    if link is None:
                        return
            else:
                link = track

            # Parse in case a playlist link was passed
            separate_video_links = YoutubeHelper._parse_youtube(link)

            playlist_was_empty = (len(audiocontroller.playlist.playque) == 0)

            for link in separate_video_links:
                audiocontroller.playlist.add(YoutubeSong(link))

            if playlist_was_empty:
                await audiocontroller.start_playback()

    @staticmethod
    def _parse_youtube(link):
        """
        Processes a youtube link and returns a list of elements
        corresponding with it (e.g. multiple videos in playlist)
        """

        # Pass it on if it is not a playlist
        if not ("playlist?list=" in link):
            return [link]

        # Parse the playlist page html and get all the individual video links
        response = urllib.request.urlopen(link)
        soup = BeautifulSoup(response.read(), "html.parser")
        res = soup.find_all('a', {'class': 'pl-video-title-link'})
        return ['https://www.youtube.com' + l.get("href") for l in res]

    @staticmethod
    def _convert_to_youtube_link(title):
        """Searches youtube for the video title and returns the first results video link"""

        filter(lambda x: x in set(printable), title)

        # Parse the search result page for the first results link
        query = urllib.parse.quote(title)
        url = "https://www.youtube.com/results?search_query=" + query
        response = urllib.request.urlopen(url)
        html = response.read()
        soup = BeautifulSoup(html, "html.parser")
        results = soup.findAll(attrs={'class': 'yt-uix-tile-link'})
        checked_videos = 0
        while len(results) > checked_videos:
            if "user" not in results[checked_videos]['href']:
                return 'https://www.youtube.com' + results[checked_videos]['href']
            checked_videos += 1
        return None
