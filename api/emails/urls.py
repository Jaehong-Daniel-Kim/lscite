from django.urls import include, path
from . import views


urlpatterns = [
    path("", views.Emails.as_view()),  # POST
    path("<int:mailbox_pk>", views.EmailListByMailbox.as_view()),  # GET
    # path("<int:pk>", views.EmailDetails.as_view()),  # GET
    # path("outmail", views.SentMails.as_view()),  # GET
    # path("attachment", views.Attachment.as_view()),  # GET | POST
]

