from django.db import models
from django.db.models.constraints import UniqueConstraint
from common.models import CommonModel

# Create your models here.


class Postbox(CommonModel):
    """
    Many-to-one
        : user = users.User
            One User object can be associated with many Postbox,
            but one Postbox can only have one User Object.

    Reverse Accessor
        : self.emails -> emails.Email
    """

    class Meta:
        db_table = "postboxes"
        verbose_name_plural = "post boxes"
        constraints = [
            UniqueConstraint(fields=["name", "user"], name="unique_inbox")
        ]

    name = models.CharField(max_length=20)
    description = models.CharField(max_length=150, blank=True)
    user = models.ForeignKey("users.User",
                             on_delete=models.CASCADE,
                             related_name="postbox")

    # === Custom Fields

    def total_mails(self):
        return self.emails.count()

    def __str__(self):
        return self.name
