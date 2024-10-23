from occupations.serializers import OccupationDetailSerializer
from .models import User
from occupations.models import Occupation
from django.contrib.auth import password_validation as validators
from rest_framework import serializers
# from occupations.serializers import DepartmentSerializer, CompanySerializere


class TinyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "avatar",
            "first_name",
            "last_name",
            "username"
        )


class CreateOrUpdateUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = (
            "username",
            "first_name",
            "last_name",
            "password",
            "primary_email",
            "secondary_email",
            "phone",
        )

    def validate_password(self, value):
        validators.validate_password(password=value)
        return value

    # def create(self, validated_data):
    #     occupation: dict = validated_data.pop("occupation")
    #     occupation_instance = Occupation.objects.filter(**occupation)
    #     # company = validated_data.pop("company")
    #     # department = validated_data.pop("department")
    #     # company_instance = Company.objects.create(**company)
    #     # department_instance = Department.objects.create(**department)
    #     validated_data.update({
    #         "occupation": occupation_instance,
    #         # "company": company_instance,
    #         # "department": department_instance,
    #     })
    #     return User(**validated_data)


class ProfileSerializer(serializers.ModelSerializer):
    occupation = OccupationDetailSerializer()

    class Meta:
        model = User
        fields = (
            "avatar",
            "username",
            "first_name",
            "last_name",
            "phone",
            "primary_email",
            "secondary_email",
            "language",
            "occupation"
        )

    # def update(self, instance, validated_data):
    #     company_data: dict = validated_data.pop("company", None)
    #     department_data: dict = validated_data.pop("department", None)
    #
    #     for attr, value in validated_data:
    #         setattr(instance, attr, value)

        # if company_data:
        #     new_company, created = Company.objects.get_or_create(**company_data)
        #     instance.company = new_company
        # if department_data:
        #     print(department_data)
        #     new_department, created = Department.objects.get_or_create(**department_data)
        #     instance.department = new_department

        # instance.save()
        # return instance


class ContactsInfoSerializer(serializers.ModelSerializer):

    name = serializers.CharField(source="get_full_name")
    # emails = EmailAddressSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = (
            "avatar",
            "name",
            "phone",
            "primary_email",
            "secondary_email",
            "emails",
        )


