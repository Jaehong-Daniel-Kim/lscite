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

    class PostboxTypeChoices(models.TextChoices):
        DEFAULT = ("default", "Default")
        CUSTOM = ("custom", "Custom")

    name = models.CharField(max_length=20)
    type = models.CharField(max_length=7, choices=PostboxTypeChoices.choices,)
    user = models.ForeignKey("users.User",
                             on_delete=models.CASCADE,
                             related_name="postbox")

    # === Custom Fields

    def total_mails(self):
        return self.emails.count()

    def unread_mails(self) -> str:
        threshold = 100
        rows: int = self.emails.filter(status="unread")[:threshold].count()
        if rows >= threshold:
            return "99+"
        else:
            return str(rows)

    def __str__(self):
        return self.name
