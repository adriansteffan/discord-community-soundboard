
from django.urls import path
from manage_users import views

urlpatterns = [
    path('create_access', views.create_access),
]
