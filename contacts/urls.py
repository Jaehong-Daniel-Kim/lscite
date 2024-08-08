from django.urls import include, path
from .views import Contacts, ContactsDetail, UserContactsInfo

urlpatterns = [
    path("", Contacts.as_view()),  # GET | POST
    path("<int:pk>", ContactsDetail.as_view()),  # GET | POST
    path("<int:pk>/contacts", UserContactsInfo.as_view()),  # GET | POST
]