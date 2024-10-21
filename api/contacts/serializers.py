from rest_framework import serializers
from .models import Contact
from users.serializers import ProfileSerializer, ContactsInfoSerializer
from users.models import User


class UserContactsInfoSerializer(serializers.ModelSerializer):
    contacts = ContactsInfoSerializer(read_only=True, many=True)

    class Meta:
        model = Contact
        fields = (
            "contacts",
        )


class ContactsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = (
            "name",
            "contacts_count",
        )

    contacts_count = serializers.SerializerMethodField()

    def get_contacts_count(self, instance) -> int:
        return instance.contacts.count()


class ContactsDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Contact
        fields = (
            "name",
            "description",
            "contacts_count",
        )

    contacts_count = serializers.SerializerMethodField()

    def get_contacts_count(self, instance) -> int:
        return instance.contacts.count()
