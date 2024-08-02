from django.db import models
from django.contrib.auth.models import AbstractUser
from common.models import CommonModel
# Create your models here.


class UserMail(CommonModel):

    class Meta:
        db_table = "user_email"

    email = models.EmailField()


class User(AbstractUser):

    class Meta:
        db_table = "user_account"

    class LanguageChoices(models.TextChoices):
        """ Choices for gender field """
        KR = ("kr", "Korean",)
        EN = ("en", "English",)

    avatar = models.ImageField(upload_to="avatars", blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    language = models.CharField(max_length=2, choices=LanguageChoices.choices, )
    email = models.ForeignKey("users.UserMail", on_delete=models.CASCADE)
    occupation = models.ForeignKey("occupations.Occupation",
                                   related_name="users",
                                   on_delete=models.SET_NULL,
                                   null=True,)
