import time

from django.shortcuts import render
from django.db import transaction
from django.db.utils import IntegrityError
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound, ParseError, PermissionDenied
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT

from .serializers import PostboxListSerializer, CreatePostboxSerializer, PostboxDetailSerializer
from .models import Postbox


# Create your views here.

class Postboxes(APIView):
    """
    api/v1/postboxes
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        try:
            postboxes = Postbox.objects.filter(user=user)
            serializer = PostboxListSerializer(postboxes, many=True)
            return Response(
                {
                    "status": "success",
                    "message": "",
                    "detail": {
                        "default": [mailbox for mailbox in serializer.data if mailbox["type"] == "default"],
                        "custom": [mailbox for mailbox in serializer.data if mailbox["type"] == "custom"]
                    }
                }, status=status.HTTP_200_OK,
            )
        except Postbox.DoesNotExist:
            raise NotFound

    def post(self, request):
        user = request.user
        serializer = CreatePostboxSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    new_postbox = serializer.save(user=user)
            except IntegrityError:
                return Response(
                    {
                        "status": "error",
                        "message": "Mailbox with the same name already exists.",
                        "detail": {},
                    }, status=status.HTTP_400_BAD_REQUEST,
                )
            except Exception as e:
                return Response(
                    {
                        "status": "error",
                        "message": "Something's wrong",
                        "detail": {
                            "error": print(e)
                        },
                    }, status=status.HTTP_400_BAD_REQUEST,
                )
            return Response(
                {
                    "status": "success",
                    "message": "Mailbox successfully created.",
                    "detail": PostboxListSerializer(new_postbox).data
                }, status=status.HTTP_200_OK,
            )
        else:
            return Response(status=HTTP_404_NOT_FOUND)

class PostboxesDetail(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, user, postbox_id):
        try:
            postbox = Postbox.objects.get(user=user, id=postbox_id)
            return postbox
        except Postbox.DoesNotExist:
            raise NotFound

    def get(self, request, postbox_id):
        user = request.user
        postbox = self.get_object(user, postbox_id)
        serializer = PostboxDetailSerializer(postbox)
        return Response(serializer.data)

    def put(self, request, postbox_id):
        user = request.user
        postbox = self.get_object(user, postbox_id)
        serializer = PostboxDetailSerializer(postbox, data=request.data, partial=True)
        # user validation
        if not request.user.is_superuser or postbox.user != request.user:
            raise PermissionDenied
        if serializer.is_valid():
            updated_postbox = serializer.save()
            return Response(PostboxDetailSerializer(updated_postbox).data)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, postbox_id):
        user = request.user
        postbox = self.get_object(user, postbox_id)
        postbox.delete()
        return Response(
            {
                "status": "success",
                "message": "Successfully removed",
                "detail": {}
            }, status=status.HTTP_200_OK,
        )