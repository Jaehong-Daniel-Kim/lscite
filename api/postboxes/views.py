from django.shortcuts import render
from django.db import transaction
from django.db.utils import IntegrityError
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
            return Response(serializer.data)
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
                raise ParseError("mailbox with the same name already exists")
            except Exception as e:
                raise e
            return Response(CreatePostboxSerializer(new_postbox).data)
        else:
            return Response(status=HTTP_404_NOT_FOUND)


class PostboxesDetail(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, user, postbox):
        try:
            postbox = Postbox.objects.get(user=user, name=postbox)
            return postbox
        except Postbox.DoesNotExist:
            raise NotFound

    def get(self, request, postbox):
        user = request.user
        postbox = self.get_object(user, postbox)
        serializer = PostboxDetailSerializer(postbox)
        return Response(serializer.data)

    def put(self, request, postbox):
        user = request.user
        postbox = self.get_object(user, postbox)
        serializer = PostboxDetailSerializer(postbox, data=request.data, partial=True)
        # user validation
        if not request.user.is_superuser or postbox.user != request.user:
            raise PermissionDenied
        if serializer.is_valid():
            updated_postbox = serializer.save()
            return Response(PostboxDetailSerializer(updated_postbox).data)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, postbox):
        user = request.user
        postbox = self.get_object(user, postbox)
        postbox.delete()
        return Response(status=HTTP_204_NO_CONTENT)

