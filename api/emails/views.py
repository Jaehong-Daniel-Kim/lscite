from django.db.models import Q
from django.db import transaction
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_404_NOT_FOUND, HTTP_400_BAD_REQUEST
from rest_framework.exceptions import NotFound, ParseError

from .models import Email, EmailAttachment
from users.models import User
from .serializers import (
    EmailListSerializer, EmailDetailSerializer, EmailSentSerializer,
    AttachmentListSerializer,
)

# Create your views here.


class Emails(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        email_list = Email.objects.filter(recipients__user=user)
        serializer = EmailListSerializer(email_list, many=True, context={"request": request})
        return Response(serializer.data)

    def post(self, request):
        serializer = EmailDetailSerializer(data=request.data)
        if serializer.is_valid():
            # user (sender)
            user = request.user
            # recipients
            recipients = request.data.get("recipients")
            if not recipients:
                return ParseError("At least one recipient is required.")
            try:
                with transaction.atomic():
                    new_email = serializer.save(user=user)
                    for recipient_pk in recipients:
                        recipient = User.objects.get(pk=recipient_pk)
                        new_email.recipients.add(recipient)
            except Exception:
                raise ParseError("recipient not found")
            # attachments
            attachments = request.data.get("attachments")
            # try:
            #     with transaction.atomic():
            #         for attachment_pk in attachments:

        else:
            Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class EmailDetails(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        user = request.user
        email = Email.objects.get(pk=pk)
        if email.recipients.filter(user__username=user):
            serializer = EmailDetailSerializer(email)
            return Response(serializer.data)
        else:
            raise NotFound


class SentMails(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        email_list = Email.objects.filter(sender__username=user)
        serializer = EmailSentSerializer(email_list, many=True)
        return Response(serializer.data)


class Attachment(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        attachments = EmailAttachment.objects.filter(email__recipients__user=user)
        serializer = AttachmentListSerializer(attachments, many=True)
        return Response(serializer.data)