from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, EmailAddress

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
        "first_email",
        "second_email",
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

    def first_email(self, instance):
        if email := list(instance.emails.all()):
            return email[0]
        return None

    def second_email(self, instance):
        if email := list(instance.emails.all()):
            if len(email) > 1:
                return email[1]
        return None





@admin.register(EmailAddress)
class EmailAddressAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "email",
    )
