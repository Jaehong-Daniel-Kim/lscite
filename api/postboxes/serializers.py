from rest_framework import serializers
from .models import Postbox
from users.serializers import TinyUserSerializer


class PostboxListSerializer(serializers.ModelSerializer):
    unreadMails = serializers.CharField(source='unread_mails')

    class Meta:
        model = Postbox
        fields = (
            "id",
            "name",
            "type",
            "unreadMails"
        )


class CreatePostboxSerializer(serializers.ModelSerializer):

    user = TinyUserSerializer(read_only=True)

    class Meta:
        model = Postbox
        fields = (
            "name",
            "type",
            "user"
        )


class PostboxDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Postbox
        fields = (
            "name",
        )
