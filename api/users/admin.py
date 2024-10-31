from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from occupations.models import Occupation
from .models import User

# Register your models here.


class OccupationInline(admin.TabularInline):  # You can also use StackedInline
    model = Occupation
    extra = 1  # Number of empty slots to display

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    inlines = [OccupationInline]  # Add Occupation inline to the User admin

    fieldsets = (
        (None, {"fields": ("username", "password")}),
        ("Personal info", {"fields": ("first_name", "last_name", "primary_email", "secondary_email")}),
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
        "full_name",
        "primary_email",
        "secondary_email",
        "occupation",
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
                       ),
        },
         ),
    )
