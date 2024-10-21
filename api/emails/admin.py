from django.contrib import admin
from .models import Email, EmailAttachment, EmailRecipient

# Register your models here.


@admin.register(Email)
class EmailAdmin(admin.ModelAdmin):
    list_display = (
        "subject",
        "sender",
        "has_attachment",
        "created_at",
    )


@admin.register(EmailAttachment)
class EmailAttachmentAdmin(admin.ModelAdmin):
    ...


@admin.register(EmailRecipient)
class EmailRecipientAdmin(admin.ModelAdmin):
    ...
