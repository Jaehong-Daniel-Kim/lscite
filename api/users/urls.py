from django.urls import path
from . import views

urlpatterns = [
    path("", views.Users.as_view()),  # POST
    path("check-existence", views.CheckExistence.as_view()),
    path("login", views.LogIn.as_view()),  # POST
    path("logout", views.LogOut.as_view()),  # POST
    path("signup", views.SignUp.as_view()),  # POST
    path("me", views.Me.as_view()),   # GET | PUT
    path("pin-code-gen", views.GeneratePinCode.as_view()),   # POST
    path("pin-code-check", views.ValidatePinCode.as_view()),   # POST
    path("search", views.PublicUser.as_view()),  # GET
]
