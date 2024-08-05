from django.db import models
from common.models import CommonModel

# Create your models here.


class PostBox(CommonModel):

    class Meta:
        db_table = "postboxes"
        verbose_name_plural = "post boxes"

    name = models.CharField(max_length=20)
    description = models.CharField(max_length=150)
    user = models.ForeignKey("users.User",
                             on_delete=models.CASCADE,
                             related_name="postbox")
