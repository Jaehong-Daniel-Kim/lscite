from .models import User, EmailAddress
from occupations.models import Department, Company
from django.contrib.auth import password_validation as validators
from rest_framework import serializers
from occupations.serializers import DepartmentSerializer, CompanySerializere


class CreateOrUpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "password",
            "phone",
        )

    def validate_password(self, value):
        validators.validate_password(password=value)
        return value


class EmailAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = EmailAddress
        fields = (
            "email",
        )


class ProfileSerializer(serializers.ModelSerializer):

    emails = EmailAddressSerializer(many=True, read_only=True)
    company = CompanySerializere()
    department = DepartmentSerializer()

    class Meta:
        model = User
        fields = (
            "avatar",
            "username",
            "first_name",
            "last_name",
            "phone",
            "emails",
            "language",
            "company",
            "department"
        )

    def update(self, instance, validated_data):
        company_data: dict = validated_data.pop("company", None)
        department_data: dict = validated_data.pop("department", None)

        for attr, value in validated_data:
            setattr(instance, attr, value)

        if company_data:
            new_company, created = Company.objects.get_or_create(**company_data)
            instance.company = new_company
        if department_data:
            print(department_data)
            new_department, created = Department.objects.get_or_create(**department_data)
            instance.department = new_department

        instance.save()
        return instance


class ContactsInfoSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source="get_full_name")
    emails = EmailAddressSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            "avatar",
            "name",
            "phone",
            "emails",
            "company",
            "department"
        )


