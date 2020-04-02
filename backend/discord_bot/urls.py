
from django.urls import path
from discord_bot import views

urlpatterns = [
    path('play_clip', views.play_clip),
    path('play_youtube', views.play_youtube),
    path('control_playback', views.control_playback),
]
