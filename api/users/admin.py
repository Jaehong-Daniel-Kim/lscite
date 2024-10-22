from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

# Register your models here.


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    list_display = [
        "username",
        "get_full_name",
        "primary_email",
        "secondary_email",
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
                       "password1",
                       "password2",
                       "company",
                       "department",
                       ),
        },
         ),
    )
