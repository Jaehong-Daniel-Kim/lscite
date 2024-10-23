from django.db import models
from common.models import CommonModel

# Create your models here.


class Company(CommonModel):

    class Meta:
        db_table = "companies"
        verbose_name_plural = "companies"

    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


class Department(CommonModel):

    class Meta:
        db_table = "departments"
        unique_together = ("name", "company")

    name = models.CharField(max_length=255)
    company = models.ForeignKey(Company,
                                on_delete=models.CASCADE,
                                related_name="department")

    def __str__(self):
        return self.name


class Group(CommonModel):

    class Meta:
        db_table = "groups"
        unique_together = ("name", "department")

    name = models.CharField(max_length=255)
    department = models.ForeignKey(Department,
                                   on_delete=models.CASCADE,
                                   related_name="group")

    def __str__(self):
        return self.name

class Team(CommonModel):

    class Meta:
        db_table = "team"
        unique_together = ("name", "group")

    name = models.CharField(max_length=255)
    group = models.ForeignKey(Group,
                              on_delete=models.CASCADE,
                              related_name="team")

    def __str__(self):
        return self.name


class Occupation(CommonModel):

    user = models.OneToOneField("users.User",
                                on_delete=models.CASCADE,
                                related_name="occupation")
    company = models.ForeignKey(Company, on_delete=models.CASCADE,)
    department = models.ForeignKey(Department, on_delete=models.CASCADE,)
    group = models.ForeignKey(Group, on_delete=models.CASCADE,)
    team = models.ForeignKey(Team, on_delete=models.CASCADE,)

    def __str__(self):
        return f"{self.user.get_full_name()}: {self.company}|{self.department}|{self.group}|{self.team}"
