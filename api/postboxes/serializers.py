from rest_framework import serializers

from emails.models import Email
from .models import Postbox
from users.serializers import TinyUserSerializer


class PostboxListSerializer(serializers.ModelSerializer):
    unreadMails = serializers.SerializerMethodField()

    class Meta:
        model = Postbox
        fields = (
            "id",
            "name",
            "type",
            "unreadMails"
        )

    def get_unreadMails(self, instance):
        threshold = 100
        rows: int = Email.objects.filter(read_status__status="unread", mail_box=instance.id).distinct().count()
        if rows >= threshold:
            return "99+"
        else:
            return str(rows)


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
