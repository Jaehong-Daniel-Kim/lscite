from rest_framework import serializers
from .models import Postbox
from users.serializers import TinyUserSerializer


class PostboxListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postbox
        fields = (
            "pk",
            "name",
            "description",
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

    mail_count = serializers.IntegerField(source="total_mails", read_only=True)

    class Meta:
        model = Postbox
        fields = (
            "name",
            "description",
            "mail_count",
        )
