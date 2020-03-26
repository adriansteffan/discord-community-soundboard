import discord
from discord.ext import commands

from discord_bot.discord_interface.config.config import *
from discord_bot.discord_interface.audiocontroller import AudioController
from discord_bot.discord_interface.utils import guild_to_audiocontroller, get_guild
from discord_bot.discord_interface.audioelements.localclip import LocalClipHelper

from discord.ext.commands import CommandNotFound


initial_extensions = ['discord_bot.discord_interface.commands.music', 'discord_bot.discord_interface.commands.general']
bot = commands.Bot(command_prefix="!", pm_help=True)

bot_event_loop = bot.loop  # for exposing the bot event loop to the web api


def start():
    for extension in initial_extensions:
        try:
            bot.load_extension(extension)
        except Exception as e:
            print(e)

    bot.run(TOKEN, bot=True, reconnect=True)


@bot.event
async def on_ready():
    print(STARTUP_MESSAGE)
    await bot.change_presence(status=discord.Status.online, activity=discord.Game(name=" Music, type !help "))

    for guild in bot.guilds:
        print(guild.name)
        await guild.me.edit(nick=DEFAULT_NICKNAME)
        guild_to_audiocontroller[guild] = AudioController(bot, guild, DEFAULT_VOLUME)
        try:
            await guild_to_audiocontroller[guild].register_voice_channel(guild.voice_channels[0])
        except:
            print("could not join "+guild.name)
        
    print(STARTUP_COMPLETE_MESSAGE)


@bot.event
async def on_guild_join(guild):
    print(guild.name)
    guild_to_audiocontroller[guild] = AudioController(bot, guild, DEFAULT_VOLUME)
    try:
        await guild_to_audiocontroller[guild].register_voice_channel(guild.voice_channels[0])
    except:
        print("could not join "+guild.name)


@bot.event
async def on_command_error(ctx, error):
    if isinstance(error, CommandNotFound):
        if ctx.message.content.startswith('!'):

            guild = get_guild(bot, ctx.message)
            if guild is not None:
                await LocalClipHelper.add_soundclip_from_name(
                    guild_to_audiocontroller[guild],
                    ctx.message.content[1:]
                )
            return
    raise error




