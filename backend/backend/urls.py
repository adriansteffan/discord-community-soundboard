from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('bot/', include('discord_bot.urls')),
    path('users/', include('manage_users.urls')),
    path('content/', include('manage_content.urls')),
    path('admin/', admin.site.urls),
]
