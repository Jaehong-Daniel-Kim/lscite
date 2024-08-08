from django.urls import path
from . import views

urlpatterns = [
    path("", views.Users.as_view()),  # POST
    path("me", views.Me.as_view()),   # GET | PUT
    path("@<str:username>", views.PublicUser.as_view()),  # GET
]
