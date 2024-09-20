from django.urls import include, path
from .views import Emails, EmailDetails, SentMails, Attachment


urlpatterns = [
    path("", Emails.as_view()),  # GET | POST
    path("<int:pk>", EmailDetails.as_view()),  # GET
    path("outmail", SentMails.as_view()),  # GET
    path("attachment", Attachment.as_view()),  # GET | POST
]

