
from django.urls import path
from manage_users import views

urlpatterns = [
    path('test', views.test),
]
