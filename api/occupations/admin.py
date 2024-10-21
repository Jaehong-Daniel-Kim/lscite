from django.contrib import admin
from .models import Company, Department

# Register your models here.


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    ...


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    ...

