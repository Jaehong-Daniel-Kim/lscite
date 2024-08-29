from rest_framework import serializers
from .models import Email, EmailRecipient, EmailAttachment
from users.serializers import TinyUserSerializer


class AttachmentNestedListSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailAttachment
        fields = (
            "file",
            "filename",
            "size"
        )


class RecipientsListSerializer(serializers.ModelSerializer):
    user = TinyUserSerializer(read_only=True)

    class Meta:
        model = EmailRecipient
        fields = (
            "user",
            "recipient_type",
        )


class MyRecipientType(serializers.ModelSerializer):
    class Meta:
        model = EmailRecipient
        fields = (
            "recipient_type",
        )


class EmailListSerializer(serializers.ModelSerializer):

    recipient_type = serializers.SerializerMethodField(read_only=True)
    sender = TinyUserSerializer(read_only=True)

    class Meta:
        model = Email
        fields = (
            "pk",
            "subject",
            "sender",
            "recipient_type",
            "created_at"
        )

    def get_recipient_type(self, email):
        user = self.context.get("request").user
        return email.recipients.get(user__username=user).recipient_type


class EmailDetailSerializer(serializers.ModelSerializer):

    sender = TinyUserSerializer(read_only=True)
    recipients = RecipientsListSerializer(read_only=True, many=True)
    attachments = AttachmentNestedListSerializer(many=True, read_only=True)

    class Meta:
        model = Email
        fields = (
            "pk",
            "subject",
            "sender",
            "recipients",
            "created_at",
            "mail_body",
            "attachments",
        )


class EmailSentSerializer(serializers.ModelSerializer):
    recipients = RecipientsListSerializer(many=True)
    recipient_count = serializers.SerializerMethodField()

    class Meta:
        model = Email
        fields = (
            "pk",
            "subject",
            "recipients",
            "recipient_count",
            "created_at"
        )

    def get_recipient_count(self, email):
        return email.recipients.count()


class AttachmentListSerializer(serializers.ModelSerializer):
    email_subject = serializers.SerializerMethodField(read_only=True)
    email_created_at = serializers.SerializerMethodField(read_only=True)
    email_sender = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = EmailAttachment
        fields = (
            "file",
            "filename",
            "size",
            "email_subject",
            "email_created_at",
            "email_sender",
        )

    def get_email_subject(self, attachment):
        return attachment.email.subject

    def get_email_created_at(self, attachment):
        return attachment.email.created_at

    def get_email_sender(self, attachment):
        return attachment.email.sender
