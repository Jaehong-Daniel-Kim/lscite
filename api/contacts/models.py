from django.db import models
from django.db.models.constraints import UniqueConstraint
from common.models import CommonModel

# Create your models here.


class Contact(CommonModel):

    class Meta:
        db_table = "contacts"
        constraints = [
            UniqueConstraint(fields=["owner", "name"], name="unique_contact")
        ]

    name = models.CharField(max_length=150)
    description = models.CharField(max_length=254, blank=True, null=True)
    owner = models.ForeignKey("users.User",
                              on_delete=models.CASCADE,
                              related_name="contacts")
    contacts = models.ManyToManyField("users.User",
                                      related_name="in_contact")
