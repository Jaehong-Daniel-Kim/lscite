from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserEmail

# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = [
        "username",
        "email",
        "first_name",
        "last_name",
        "company",
        "department",
    ]

    readonly_fields = ["date_joined", "last_login"]
    add_fieldsets = (
        (None,  {
            "classes": ("wide",),
            "fields": ("first_name",
                       "last_name",
                       "username",
                       "email",
                       "password1",
                       "password2",
                       "company",
                       "department",
                       ),
        },
         ),
    )


@admin.register(UserEmail)
class UserMailAdmin(admin.ModelAdmin):
    ...
