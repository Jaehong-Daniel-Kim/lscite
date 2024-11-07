from rest_framework import serializers
from postboxes.models import Postbox
from .models import Email, EmailRecipient, EmailAttachment, EmailReadStatus
from users.serializers import TinyUserSerializer, ProfileSerializer
from django.core.exceptions import ObjectDoesNotExist
from datetime import datetime


def get_created(instance):
    created_at = instance.created_at
    today = datetime.today()
    if today.year == created_at.year:
        # This year
        if (today.month == created_at.month and
                today.day == created_at.day):
            return created_at.strftime("%H:%M")
        else:
            return created_at.strftime("%m-%d %H:%M")
    else:
        # Not this year
        return created_at.strftime("%y-%m-%d %H:%M")


class AttachmentNestedListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailAttachment
        fields = (
            "file",
            "filename",
            "size"
        )


class RecipientsDetailSerializer(serializers.ModelSerializer):
    user = ProfileSerializer(read_only=True)

    class Meta:
        model = EmailRecipient
        fields = (
            "user",
            "recipient_type",
        )


class RecipientsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmailRecipient
        fields = (
            "user",
            "recipient_type",
        )


# class ReadStatusSerializer(serializers.ModelSerializer):
#
#     class Meta:
#         model = EmailReadStatus
#         fields = (
#             "email",
#             "recipient",
#             "status",
#         )


# class MyRecipientType(serializers.ModelSerializer):
#     class Meta:
#         model = EmailRecipient
#         fields = (
#             "recipient_type",
#         )


class SentEmailListSerializer(serializers.ModelSerializer):

    # sender = TinyUserSerializer(read_only=True)
    sender = ProfileSerializer(read_only=True)
    created_datetime = serializers.SerializerMethodField(read_only=True)
    # recipients = serializers.SerializerMethodField(read_only=True)
    recipients = RecipientsDetailSerializer(read_only=True, many=True)

    class Meta:
        model = Email
        fields = (
            "pk",
            "subject",
            "sender",
            "recipients",
            "created_datetime",
        )

    def get_created_datetime(self, instance):
        return get_created(instance)

    # def get_recipients(self, instance):
    #     try:
    #         # user = self.context.get("request").user
    #         return instance.recipients.all()
    #     except ObjectDoesNotExist:
    #         return None


class EmailListSerializer(serializers.ModelSerializer):

    recipient_type = serializers.SerializerMethodField(read_only=True)
    # sender = TinyUserSerializer(read_only=True)
    sender = ProfileSerializer(read_only=True)
    created_datetime = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Email
        fields = (
            "pk",
            "subject",
            "sender",
            "recipient_type",
            "created_datetime"
        )

    def get_created_datetime(self, instance):
        return get_created(instance)

    def get_recipient_type(self, instance):
        user = self.context.get("request").user
        return instance.recipients.get(user__username=user).recipient_type


class NewEmailSerializer(serializers.ModelSerializer):

    # sender = ProfileSerializer(read_only=True)
    # recipients = RecipientsListSerializer(read_only=True, many=True)

    class Meta:
        model = Email
        fields = (
            # "sender",
            "subject",
            # "recipients",
            "mail_body",
        )


# class EmailDetailSerializer(serializers.ModelSerializer):
#
#     sender = ProfileSerializer(read_only=True)
#     recipients = RecipientsListSerializer(read_only=True, many=True)
#     attachments = AttachmentNestedListSerializer(many=True, read_only=True)
#
#     class Meta:
#         model = Email
#         fields = (
#             "pk",
#             "subject",
#             "sender",
#             "recipients",
#             "created_at",
#             "mail_body",
#             "attachments",
#         )


# class EmailSentSerializer(serializers.ModelSerializer):
#     recipients = RecipientsListSerializer(many=True)
#     recipient_count = serializers.SerializerMethodField()
#
#     class Meta:
#         model = Email
#         fields = (
#             "pk",
#             "subject",
#             "recipients",
#             "recipient_count",
#             "created_at"
#         )

    # def get_recipient_count(self, email):
    #     return email.recipients.count()


# class AttachmentListSerializer(serializers.ModelSerializer):
#     email_subject = serializers.SerializerMethodField(read_only=True)
#     email_created_at = serializers.SerializerMethodField(read_only=True)
#     email_sender = serializers.SerializerMethodField(read_only=True)
#     class Meta:
#         model = EmailAttachment
#         fields = (
#             "file",
#             "filename",
#             "size",
#             "email_subject",
#             "email_created_at",
#             "email_sender",
#         )
#
#     def get_email_subject(self, attachment):
#         return attachment.email.subject
#
#     def get_email_created_at(self, attachment):
#         return attachment.email.created_at
#
#     def get_email_sender(self, attachment):
#         return attachment.email.sender
