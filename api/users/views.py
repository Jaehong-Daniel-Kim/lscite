from django.contrib.auth import authenticate, login, logout
from django.core.cache import cache
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ParseError, NotFound
from rest_framework.permissions import IsAuthenticated

from .serializers import CreateOrUpdateUserSerializer, ProfileSerializer
from .models import User
import time

# Create your views here.


class Users(APIView):

    """
    # api/v1/users

    API view for creating new users
    """

    def post(self, request):
        print(request.data)
        if password := request.data.get("password", None):
            serializer = CreateOrUpdateUserSerializer(data=request.data)
            if serializer.is_valid():
                # Create User Account
                new_user = serializer.save()
                new_user.set_password(password)
                new_user.save()
                data: dict = CreateOrUpdateUserSerializer(new_user).data
                return Response({
                    "status": "success",
                    "message": "User successfully created.",
                    "detail": {
                        "first_name": data["first_name"],
                        "last_name": data["last_name"],
                        "username": data["username"],
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "status": "error",
                    "message": "Wrong input",
                    "detail": serializer.errors,
                    }, status=status.HTTP_200_OK)
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
            return Response({
                "status": "success",
                "message": "Successfully logged in",
                "detail": {},
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "status": "error",
                "message": "Check username or password again",
                "detail": {},
            }, status=status.HTTP_401_UNAUTHORIZED)


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


class CheckExistence(APIView):
    """
    # api/v1/users/check-existence?params=params1

    API view for searching existence of entities.
    """
    def get(self, request):
        print("checking")
        time.sleep(3)
        if username := request.GET.get("username"):
            if User.objects.filter(username=username).exists():
                return Response(
                    {
                        "status": "error",
                        "message": "Username already in use",
                        "detail": {}
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {
                        "status": "success",
                        "message": "Username available to use!",
                        "detail": {},
                    },
                    status=status.HTTP_200_OK
                )
        elif email := request.GET.get("email"):
            print(email)
            if User.objects.filter(secondary_email__exact=email).exists():
                return Response(
                    {
                        "status": "error",
                        "message": "User email already in use",
                        "detail": {},
                    },
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {
                        "status": "success",
                        "message": "User email available to use!",
                        "detail": {},
                    }, status=status.HTTP_200_OK
                )


class GeneratePinCode(APIView):
    """
    # api/v1/users/otp-gen

    generate OTP
    """
    MAX_PIN_CODE_ATTEMPTS = 5
    PIN_CODE_ATTEMPTS_KEY = "pin_code_attempts_{email}"
    PIN_CODE_LOCK_KEY = "pin_code_lock_{email}"
    PIN_CODE_KEY = "pin_code_key_{email}"

    def post(self, request):
        time.sleep(5)
        if email_addr := request.data.get("email", None):
            pin_code_attempts_key = self.PIN_CODE_ATTEMPTS_KEY.format(email=email_addr)
            pin_code_attempts = cache.get_or_set(pin_code_attempts_key, 0)

            if pin_code_attempts >= self.MAX_PIN_CODE_ATTEMPTS:
                # User has exceeded the maximum pin code attempts
                return Response(
                    {
                        "status": "error",
                        "message": "Exceeded maximum attempts. Try again later.",
                        "detail": {},
                    }, status=status.HTTP_429_TOO_MANY_REQUESTS
                )
            else:
                # User requesting new OTP

                # Generate a random 6-digit OTP
                pin_code = str(random.randint(10000, 99999))

                # Store the OTP in the cache with a 5-minute expiration
                pin_code_cache_key = self.PIN_CODE_KEY.format(email=email_addr)
                cache.set(pin_code_cache_key, pin_code)

                # increment attempt count
                cache.incr(pin_code_attempts_key)
                return Response(
                    {
                        "status": "success",
                        "message": "Pin code successfully generated",
                        "detail": {
                            "email": email_addr,
                            "pin_code": cache.get(pin_code_cache_key),
                            "remaining": cache.get(pin_code_attempts_key),
                        },
                    }, status=status.HTTP_200_OK,
                )
        return Response(
            {
                "status": "error",
                "message": "Invalid request",
                "detail": {},
            }, status=status.HTTP_400_BAD_REQUEST,
        )


class ValidatePinCode(APIView):
    MAX_PIN_CODE_ATTEMPTS = 5
    LOCK_EXPIRATION = 300  # 5 minutes
    PIN_CODE_ATTEMPTS_KEY = "pin_code_attempts_{email}"
    PIN_CODE_LOCK_KEY = "pin_code_lock_{email}"
    PIN_CODE_KEY = "pin_code_key_{email}"

    def post(self, request):
        time.sleep(5)
        email_addr = request.data.get("email", None)
        pin_code_entered = request.data.get("pin_code", None)

        pin_code_attempts_key = self.PIN_CODE_ATTEMPTS_KEY.format(email=email_addr)
        pin_code_lock_key = self.PIN_CODE_LOCK_KEY.format(email=email_addr)
        is_locked = cache.get(pin_code_lock_key, False)

        if is_locked:
            # User is locked due to muiltiple incorrect OTP attempts
            return Response(
                {
                    "status": "error",
                    "message": "Exceeded maximum attempts. Try again later.",
                    "detail": {},
                }, status=status.HTTP_429_TOO_MANY_REQUESTS,
            )

        pin_code_key = self.PIN_CODE_KEY.format(email=email_addr)
        pin_code_cached = cache.get(pin_code_key)

        if pin_code_cached and pin_code_entered == pin_code_cached:
            cache.delete_many = [pin_code_attempts_key, pin_code_lock_key, pin_code_key]
            return Response(
                {
                    "status": "success",
                    "message": "Successfully validate!",
                    "detail": {},
                }, status=status.HTTP_200_OK,
            )

        else:
            try:
                cache.incr(pin_code_attempts_key)
            except ValueError:
                return Response(
                    {
                        "status": "error",
                        "message": "Invalid request",
                        "detail": {},
                    }, status=status.HTTP_400_BAD_REQUEST
                )

            if cache.get(pin_code_attempts_key) >= self.MAX_PIN_CODE_ATTEMPTS:
                cache.set(pin_code_lock_key, True, timeout=self.LOCK_EXPIRATION)

            print(cache.get(pin_code_attempts_key))
            return Response(
                {
                    "status": "error",
                    "message": "Invalid pin code.",
                    "detail": {},
                }, status=status.HTTP_400_BAD_REQUEST,
            )


class SignUp(APIView):
    def post(self, request):
        pass

