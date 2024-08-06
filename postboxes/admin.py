from django.contrib import admin
from .models import Postbox

# Register your models here.


@admin.register(Postbox)
class PostBoxAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "user",
        "description",
        "total_mails"
    )
