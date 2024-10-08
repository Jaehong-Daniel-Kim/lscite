from django.db import models
from common.models import CommonModel

# Create your models here.


class Company(CommonModel):
    """
    Reverse Accessor
        : self.users -> users.User

    """

    class Meta:
        db_table = "companies"
        verbose_name_plural = "companies"

    name = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Department(CommonModel):
    """
    Reverse Accessor
        : self.users - users.User

    """

    class Meta:
        db_table = "departments"

    class DepartmentChoice(models.TextChoices):
        Dept1 = ("dept1", "Dept1")
        Dept2 = ("dept2", "Dept2")

    department = models.CharField(max_length=5, choices=DepartmentChoice)
    group = models.CharField(max_length=50)
    team = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.department}|{self.group}|{self.team}"
