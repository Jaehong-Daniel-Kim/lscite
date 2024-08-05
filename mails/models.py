from django.db import models
from common.models import CommonModel

# Create your models here.


class MailAttachment(CommonModel):

    class Meta:
        db_table = "mail_attachments"

    mail_attachment = models.JSONField(blank=True, null=True)


class MailBody(CommonModel):

    class Meta:
        db_table = "mail_body"

    mail_body = models.TextField()


class OutMail(CommonModel):

    class Meta:
        db_table = "out_mail"

    class StatusChoices(models.TextChoices):
        TEMP = ("writing", "Writing")
        PEND = ("pending", "Pend")
        FAIL = ("fail", "Fail")
        SUCCESS = ("sent", "Sent")

    sender = models.ForeignKey("users.UserEmail",
                               related_name="out_mail",
                               on_delete=models.SET_NULL,
                               null=True, )
    recipient = models.ManyToManyField("users.UserEmail")
    subject = models.CharField(max_length=150)
    mail_body = models.ForeignKey("mails.MailBody",
                                  related_name="out_mail",
                                  on_delete=models.SET_NULL,
                                  null=True, )
    mail_attachment = models.ForeignKey("mails.MailAttachment",
                                        related_name="out_mail",
                                        on_delete=models.SET_NULL,
                                        null=True, )
    to_addr = models.CharField(max_length=25)
    to_service = models.CharField(max_length=50)
    status = models.CharField(choices=StatusChoices.choices,
                              max_length=7,
                              default="writing", )


class InMail(CommonModel):

    class Meta:
        db_table = "in_mails"

    class StatusChoices(models.TextChoices):
        READ = ("read", "Read")
        UNREAD = ("unread", "Unread")

    sender = models.ForeignKey("users.UserEmail",
                               on_delete=models.SET_NULL,
                               null=True, )
    recipient = models.ManyToManyField("users.UserEmail",
                                       related_name="in_mail")
    subject = models.CharField(max_length=150)
    mail_body = models.ForeignKey("mails.MailBody",
                                  related_name="in_mail",
                                  on_delete=models.SET_NULL,
                                  null=True, )
    mail_attachment = models.ForeignKey("mails.MailAttachment",
                                        related_name="in_mail",
                                        on_delete=models.SET_NULL,
                                        null=True, )
    from_addr = models.CharField(max_length=25)
    from_service = models.CharField(max_length=50)
    status = models.CharField(choices=StatusChoices.choices,
                              max_length=6,
                              default="unread", )
    mail_box = models.ManyToManyField("postboxes.PostBox",
                                      related_name="in_mail")




