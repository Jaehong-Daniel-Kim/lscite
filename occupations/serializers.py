from rest_framework import serializers
from .models import Department, Company


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = (
            "department",
            "group",
            "team",
        )


class CompanySerializere(serializers.ModelSerializer):

    class Meta:
        model = Company
        fields = (
            "name",
        )
