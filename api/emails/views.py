from django.db.models import Q
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, ParseError

from users.pagination import EmailSearchLargePagination
from .models import Email, EmailAttachment, EmailReadStatus, EmailRecipient
from users.models import User
from postboxes.models import Postbox
from .serializers import (
    EmailListSerializer, NewEmailSerializer, RecipientsListSerializer,
    SentEmailListSerializer, EmailDetailSerializer
)

# Create your views here.


class Emails(APIView):

    permission_classes = [IsAuthenticated]

    def get_mailbox(self, user, target_mailbox: str):
        return user.postbox.get(name=target_mailbox)

    def post (self, request):
        email_serializer = NewEmailSerializer(data=request.data)
        if email_serializer.is_valid():
            user = request.user
            recipients = request.data.get("recipients")
            recipient_serializer = RecipientsListSerializer(data=recipients, many=True)
            if recipient_serializer.is_valid():
                try:
                    with transaction.atomic():
                        new_email = email_serializer.save(sender=user)  # save email
                        recipients = recipient_serializer.save(email=new_email)  # save recipients
                        recipient_users: [User] = [data["user"] for data in recipient_serializer.validated_data]
                        # save mailbox
                        sent_box = user.postbox.get(name="sent")
                        new_email.mail_box.add(sent_box)
                        inboxes = Postbox.objects.filter(user__in=recipient_users, name="inbox")
                        for inbox in inboxes:
                            new_email.mail_box.add(inbox)
                        # read status
                        statuses = [
                            EmailReadStatus(email=new_email, recipient=recipient, status="unread")
                            for recipient in recipients
                        ]
                        EmailReadStatus.objects.bulk_create(statuses)
                        return Response({
                            "status": "success",
                            "message": "Successfully sent",
                            "detail": {},
                        }, status=status.HTTP_200_OK)
                except BaseException as e:
                    print(e)
                    return Response(e)

            else:
                return Response(recipient_serializer.errors)
        else:
            return Response(email_serializer.errors)


class EmailListByMailbox(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, mailbox_pk):
        user = request.user
        postbox = Postbox.objects.get(pk=mailbox_pk)
        if postbox.user == user:
            emails = Email.objects.filter(mail_box=mailbox_pk).order_by("-created_at")
            paginator = EmailSearchLargePagination()
            paginated_query = paginator.paginate_queryset(emails, request)  # request should have "page" param
            if postbox.name == "sent":
                serializer = SentEmailListSerializer(paginated_query, many=True, context={"request": request})
            else:
                serializer = EmailListSerializer(paginated_query, many=True, context={"request": request})
            return Response({
                "status": "success",
                "message": "successfully retrieved emails",
                "detail": serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            "status": "error",
            "message": "error authenticating",
            "detail": {},
        })


class EmailDetail(APIView):

    permission_classes = [IsAuthenticated]

    def get_email(self, pk):
        return Email.objects.get(pk=pk)

    def get(self, request, pk):
        user = request.user
        email = self.get_email(pk)
        if len(email.recipients.filter(user__username=user).distinct()):
            serializer = EmailDetailSerializer(email)
            return Response({
                "status": "success",
                "message": "data fetch successful",
                "detail": serializer.data
            })
        return Response({
            "status": "error",
            "message": "something is wrong",
            "detail": {},
        })



# class EmailDetails(APIView):
#
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request, pk):
#         user = request.user
#         email = Email.objects.get(pk=pk)
#         if email.recipients.filter(user__username=user):
#             serializer = EmailDetailSerializer(email)
#             return Response(serializer.data)
#         else:
#             raise NotFound


# class SentMails(APIView):
#
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request):
#         user = request.user
#         email_list = Email.objects.filter(sender__username=user)
#         serializer = EmailSentSerializer(email_list, many=True)
#         return Response(serializer.data)


# class Attachment(APIView):
#
#     permission_classes = [IsAuthenticated]
#
#     def get(self, request):
#         user = request.user
#         attachments = EmailAttachment.objects.filter(email__recipients__user=user)
#         serializer = AttachmentListSerializer(attachments, many=True)
#         return Response(serializer.data)