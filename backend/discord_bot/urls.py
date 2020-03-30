
from django.urls import path
from discord_bot import views

urlpatterns = [
    path('playauth', views.playauth),
    path('playnoauth', views.playnoauth),
]
