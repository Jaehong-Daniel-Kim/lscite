from django.contrib import admin
from .models import InMail, OutMail, MailBody, MailAttachment

# Register your models here.


@admin.register(InMail)
class InMailAdmin(admin.ModelAdmin):
    ...


@admin.register(OutMail)
class OutMailAdmin(admin.ModelAdmin):
    ...


@admin.register(MailBody)
class MailBodyAdmin(admin.ModelAdmin):
    ...


@admin.register(MailAttachment)
class MailAttachmentAdmin(admin.ModelAdmin):
    ...
