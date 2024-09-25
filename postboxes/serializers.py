from rest_framework import serializers
from .models import Postbox
from users.serializers import TinyUserSerializer


class PostboxListSerializer(serializers.ModelSerializer):
    unreadMails = serializers.CharField(source='unread_mails')

    class Meta:
        model = Postbox
        fields = (
            "name",
            "description",
            "unreadMails"
        )


class CreatePostboxSerializer(serializers.ModelSerializer):

    user = TinyUserSerializer(read_only=True)

    class Meta:
        model = Postbox
        fields = (
            "name",
            "description",
            "user"
        )


class PostboxDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Postbox
        fields = (
            "name",
            "description",
        )
