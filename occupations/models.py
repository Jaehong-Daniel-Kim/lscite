from django.db import models
from common.models import CommonModel

# Create your models here.


class Company(CommonModel):

    class Meta:
        db_table = "Company"

    name = models.CharField(max_length=20)


class Department(CommonModel):

    class Meta:
        db_table = "departments"

    class DepartmentChoice(models.TextChoices):
        Dept1 = ("dept1", "Dept1")
        Dept2 = ("dept2", "Dept2")

    department = models.CharField(max_length=5, choices=DepartmentChoice)
    group = models.CharField(max_length=5)
    team = models.CharField(max_length=5)


class Occupation(CommonModel):

    class Meta:
        db_table = "occupations"

    company = models.ForeignKey("occupations.Company",
                                related_name="occupations",
                                on_delete=models.SET_NULL,
                                null=True, )
    department = models.ForeignKey("occupations.Department",
                                   related_name="occupations",
                                   on_delete=models.SET_NULL,
                                   null=True, )
