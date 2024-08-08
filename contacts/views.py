from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import NotFound
from rest_framework.status import HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from .models import Contact
from .serializers import ContactsListSerializer, ContactsDetailSerializer, UserContactsInfoSerializer

# Create your views here.

class Contacts(APIView):
    """
    # api/v1/contacts/

    API view for checking own contact lists or create a new one
    """

    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Check my own contact lists
        user = request.user
        contacts = Contact.objects.filter(owner=user)
        serializer = ContactsListSerializer(contacts, many=True)
        return Response(serializer.data)

    # def post(self, request):
    #     # Create my own contact lists
    #     user = request.user
    #     serializer = ContactSerializer(data=request.data)
    #     if serializer.is_valid():
    #         print("valid")
    #     else:
    #         return Response(serializer.errors)


class ContactsDetail(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        # get object
        try:
            contact = Contact.objects.get(pk=pk)
            return contact
        except Contact.DoesNotExist:
            raise NotFound

    def get(self, request, pk):
        # Check my own contact list in detail
        contact = self.get_object(pk)
        serializer = ContactsDetailSerializer(contact)
        if contact.owner == request.user:
            return Response(serializer.data)
        else:
            return Response(status=HTTP_404_NOT_FOUND)


class UserContactsInfo(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        # get Contact object
        try:
            contact = Contact.objects.get(pk=pk)
            return contact
        except Contact.DoesNotExist:
            raise NotFound

    def get(self, request, pk):
        contact = self.get_object(pk)
        if contact.owner == request.user:
            serializer = UserContactsInfoSerializer(contact)
            return Response(serializer.data)
        else:
            return Response(status=HTTP_404_NOT_FOUND)





