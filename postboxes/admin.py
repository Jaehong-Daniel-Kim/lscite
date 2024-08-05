from django.contrib import admin
from .models import PostBox

# Register your models here.


@admin.register(PostBox)
class PostBoxAdmin(admin.ModelAdmin):
    ...
