from rest_framework import serializers
# from .models import Department, Company
from .models import Company, Department, Group, Team, Occupation


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ("id", "name",)


class GroupSerializer(serializers.ModelSerializer):
    team = TeamSerializer(many=True)
    class Meta:
        model = Group
        fields = ("id", "name", "team")


class DepartmentSerializer(serializers.ModelSerializer):
    group = GroupSerializer(many=True)
    class Meta:
        model = Department
        fields = ("id", "name", "group")


class CompanySerializer(serializers.ModelSerializer):
    department = DepartmentSerializer(many=True)
    class Meta:
        model = Company
        fields = ("id", "name", "department")


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
