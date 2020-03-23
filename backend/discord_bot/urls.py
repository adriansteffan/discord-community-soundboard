
from django.urls import path
from discord_bot import views

urlpatterns = [
    path('test', views.test),
]
