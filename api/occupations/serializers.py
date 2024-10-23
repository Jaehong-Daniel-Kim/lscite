from rest_framework import serializers
# from .models import Department, Company
from .models import Company, Department, Group, Team, Occupation


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ("name",)


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ("name",)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ("name",)


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("name",)


class OccupationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Occupation
        fields = (
            "company",
            "department",
            "group",
            "team",
        )


class OccupationDetailSerializer(serializers.ModelSerializer):
    company = serializers.StringRelatedField()
    department = serializers.StringRelatedField()
    group = serializers.StringRelatedField()
    team = serializers.StringRelatedField()

    class Meta:
        model = Occupation
        fields = ("company",
                  "department",
                  "group",
                  "team")
