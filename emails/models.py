from django.db import models
from common.models import CommonModel

# Create your models here.


class EmailRecipient(CommonModel):
    """
    Many-to-one
        : user = users.User
            One User object can be associated with many Recipient objects,
            but one Recipient object can only have one User object.
        : email = emails.Email
            One Email object can be associated with many Recipient objects,
            but one Recipient object can only have one Email object.
    """

    class Meta:
        db_table = "email_recipients"

    class RecipientTypeChoices(models.TextChoices):
        TO = ("to", "To")
        CC = ("cc", "Cc")
        BCC = ("bcc", "Bcc")

    user = models.ForeignKey("users.User",
                             on_delete=models.CASCADE, )
    email = models.ForeignKey("emails.Email",
                              on_delete=models.CASCADE,
                              related_name="recipients")
    recipient_type = models.CharField(max_length=3,
                                      choices=RecipientTypeChoices.choices, )

    def __str__(self):
        return self.user.username


class EmailAttachment(CommonModel):
    """
    Many-to-one
        : email = emails.Email
            One Email object can be associated with many Attachment objects,
            but one Attachment object can only have one Mail Object.

    """

    class Meta:
        db_table = "email_attachments"

    file = models.FileField(upload_to="attachments/%Y-%m-%d")
    size = models.PositiveIntegerField()
    email = models.ForeignKey("emails.Email",
                              on_delete=models.CASCADE,
                              related_name="attachments", )

    def __str__(self):
        return self.file.name


class Email(CommonModel):
    """
    Many-to-one
        : sender = users.User
            One User object can be associated with many Email objects,
            but one Email object can only have one User (sender) object.

    Reverse Accessor
        : self.attachments -> emails.EmailAttachment
        : self.recipients -> emails.EmailRecipient
    """

    class Meta:
        db_table = "emails"

    class StatusChoices(models.TextChoices):
        READ = ("read", "Read")
        UNREAD = ("unread", "Unread")

    sender = models.ForeignKey("users.User",
                               on_delete=models.CASCADE,
                               related_name="mail_sent")
    subject = models.CharField(max_length=150)
    mail_body = models.TextField()
    status = models.CharField(choices=StatusChoices.choices,
                              max_length=6,
                              default="unread", )
    mail_box = models.ManyToManyField("postboxes.Postbox",
                                      related_name="emails")

    def __str__(self):
        return self.subject

    # === Custom Fields

    def has_attachment(self):
        return self.attachments.count() > 0
