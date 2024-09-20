from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ParseError, NotFound
from rest_framework.permissions import IsAuthenticated

from .serializers import CreateOrUpdateUserSerializer, ProfileSerializer
from .models import User

# Create your views here.


class Users(APIView):

    """
    # api/v1/users

    API view for creating new users
    """

    def post(self, request):
        print(request.data)
        if password := request.data.get("password"):
            serializer = CreateOrUpdateUserSerializer(data=request.data)
            if serializer.is_valid():
                new_user = serializer.save()
                new_user.set_password(password)
                new_user.save()
                return Response(CreateOrUpdateUserSerializer(new_user).data)
            else:
                return Response(serializer.errors)
        else:
            raise ParseError


class LogIn(APIView):

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        if not username or not password:
            raise ParseError
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user=user)
            return Response({"OK": "Success."})
        else:
            return Response({"ERROR": "Failed. Check username or password again."})


class LogOut(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"OK": "Success"})


class Me(APIView):

    """
    # api/v1/users/me

    API view for checking user's own profile
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response(ProfileSerializer(user).data)

    def put(self, request):
        user = request.user
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            updated_user = serializer.save()
            return Response(ProfileSerializer(updated_user).data)
        else:
            return Response(serializer.errors)


class PublicUser(APIView):
    """
    # api/v1/users/me

    API view for checking other users profile
    """

    permission_classes = [IsAuthenticated]

    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise NotFound
        serializer = ProfileSerializer(user)
        return Response(serializer.data)



