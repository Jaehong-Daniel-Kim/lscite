from django.db import models
from django.db.models.constraints import UniqueConstraint
from common.models import CommonModel

# Create your models here.


class PostBox(CommonModel):

    class Meta:
        db_table = "postboxes"
        verbose_name_plural = "post boxes"
        constraints = [
            UniqueConstraint(fields=["name", "user"], name="unique_inbox")
        ]

    name = models.CharField(max_length=20)
    description = models.CharField(max_length=150)
    user = models.ForeignKey("users.User",
                             on_delete=models.CASCADE,
                             related_name="postbox")

    def __str__(self):
        return self.name
