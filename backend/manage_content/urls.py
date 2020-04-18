
from django.urls import path
from manage_content import views

urlpatterns = [
    path('fetch', views.fetch_data),
    path('create_tag', views.create_tag),
    path('delete_tag', views.delete_tag),
    path('add_tag', views.add_tag),
    path('upload_sound_clip', views.upload_sound_clip)
]
