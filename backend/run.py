from backend import wsgi
from waitress import serve
import threading

from discord_bot.discord_interface import run_bot

if __name__ == '__main__':

    # Start discord bot on separate thread
    threading.Thread(target=run_bot.start).start()

    # Run django server via waitress on main thread
    serve(wsgi.application, listen='*:8080')
