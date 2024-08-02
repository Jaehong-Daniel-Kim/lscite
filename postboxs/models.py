from django.db import models
from common.models import CommonModel

# Create your models here.


class PostBox(CommonModel):

    class Meta:
        db_table = "postboxes"

    name = models.CharField(max_length=20)
    description = models.CharField(max_length=150)
