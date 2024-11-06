from django.contrib.auth import authenticate, login, logout
from django.db.models import Q
from django.core.cache import cache
import random

from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ParseError, NotFound, ValidationError
from rest_framework.permissions import IsAuthenticated

from postboxes.serializers import CreatePostboxSerializer
from .serializers import CreateOrUpdateUserSerializer, ProfileSerializer
from occupations.serializers import OccupationSerializer, OccupationDetailSerializer
from .pagination import UserSearchListSmallPagination
from occupations.models import Company, Department, Group, Team
from .models import User
import time

# Create your views here.


class Users(APIView):

    """
    # api/v1/users

    API view for creating new users
    """
    def _create_occupation(self, data: dict, user: User) -> None:
        serializer = OccupationSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)

    def _create_default_postboxes(self, user: User) -> None:
        default_postboxes = ("inbox", "sent", "drafts",)
        data = [
            {"name": postbox, "user": user, "type": "default"} for postbox in default_postboxes
        ]
        serializer = CreatePostboxSerializer(data=data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)

    def post(self, request):
        print(request.data)
        # occupation_pk_data = self.get_occupation_pk(request.data.pop("occupation"))
        occupation_data = request.data.pop("occupation")
        occupation_data = {key: value if int(value) > 0 else None
                           for (key, value) in occupation_data.items()}
        # user serializer
        user_serializer = CreateOrUpdateUserSerializer(data=request.data)
        try:
            with transaction.atomic():
                # new user
                user_serializer.is_valid(raise_exception=True)
                new_user = user_serializer.save()
                new_user.set_password(request.data["password"])
                new_user.save()
                # create occupation
                self._create_occupation(occupation_data, new_user)
                # create default postboxes
                self._create_default_postboxes(new_user)
                new_data = ProfileSerializer(new_user).data
                return Response({
                    "status": "success",
                    "message": "User successfully created.",
                    "detail": {
                        "first_name": new_data["first_name"],
                        "last_name": new_data["last_name"],
                        "username": new_data["username"],
                        "occupation": new_data["occupation"]
                    }
                }, status=status.HTTP_200_OK)

        except ValidationError as e:
            return Response({
                "status": "error",
                "message": "Something went wrong",
                "detail": e.detail,
            }, status=status.HTTP_200_OK)


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
    # api/v1/users/search

    API view for checking other users profile
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        category = request.GET.get("category", None)
        keyword = request.GET.get("keyword", None)
        user = request.user
        if category and keyword:
            if category == "name":
                search_keys = [{"first_name__contains": keyword}, {"last_name__contains": keyword}]
                users_queryset = User.objects.filter(
                    Q(**search_keys[0]) | Q(**search_keys[1])
                ).exclude(username=user.username).exclude(username="admin")
            elif category in ("company", "team"):
                search_keys = [{f"occupation__{category}__name__contains": keyword}]
                users_queryset = User.objects.filter(
                    Q(**search_keys[0])
                ).exclude(username=user.username).exclude(username="admin")
            else:
                return Response({
                    "status": "error",
                    "message": "Invalid category",
                    "detail": {
                        "category": category
                    }
                }, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({
                "status": "error",
                "message": "Unspecified category or keyword",
                "detail": {
                    "category": category,
                    "keyword": keyword,
                }
            }, status=status.HTTP_400_BAD_REQUEST)
        paginator = UserSearchListSmallPagination()
        paginated_query = paginator.paginate_queryset(users_queryset, request)  # request should have "page" param
        serializer = ProfileSerializer(paginated_query, many=True)
        data = serializer.data
        return Response({
            "status": "success",
            "message": "Success",
            "detail": {
                "total": users_queryset.count(),
                "count": len(data),
                "data": data,
            },
        })


class CheckExistence(APIView):
    """
    # api/v1/users/check-existence?params=params1

    API view for searching existence of entities.
    """
    def get(self, request):
        print("checking")
        # time.sleep(3)
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
        # time.sleep(5)
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
        # time.sleep(5)
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

