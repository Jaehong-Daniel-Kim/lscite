from django.contrib import admin
from .models import Company, Department, Group, Team, Occupation

# Register your models here.


@admin.register(Occupation)
class CompanyAdmin(admin.ModelAdmin):
    ...


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    ...


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    ...


@admin.register(Group)
class DepartmentAdmin(admin.ModelAdmin):
    ...


@admin.register(Team)
class DepartmentAdmin(admin.ModelAdmin):
    ...
