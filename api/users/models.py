from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.validators import UnicodeUsernameValidator
from common.models import CommonModel
# Create your models here.


class CustomUserManager(BaseUserManager):

    def create_user(self, username, password=None, **extra_fields):
        if email := extra_fields.get("email"):
            try:
                validate_email(email)
            except ValidationError as e:
                raise ValueError("Invalid Email Address") from e
            email_instance, created = User.objects.get_or_create(email=email)
            user = self.model(username=username, email=email_instance, **extra_fields)
        else:
            user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, password, **extra_fields)


class EmailAddress(CommonModel):

    class Meta:
        db_table = "user_email_addresses"

    class EmailTypeChoice(models.TextChoices):
        Type1 = ("type1", "Type1")
        Type2 = ("type2", "Type2")

    user = models.ForeignKey("users.User",
                             on_delete=models.CASCADE,
                             related_name="emails")
    email = models.EmailField(unique=True,
                              help_text="Required. 254 characters or fewer in [email@domain.com] format",
                              error_messages={"unique": "A user with that email address already exists"})
    type = models.CharField(max_length=5,
                            choices=EmailTypeChoice.choices,
                            null=True)

    def __str__(self):
        return self.email


class User(AbstractBaseUser, PermissionsMixin):

    """
    Many-to-one
        : company = occupations.Company
            One Company object can be associated with many User objects,
            but one User can only have one Company object.
        : department = occupations.Department
            One Department object can be associated with many User objects,
            but one User can only have one Department object.

    Reverse Accessor
        : self.emails -> users.EmailAddress
    """

    class Meta:
        db_table = "user_accounts"

    class LanguageChoices(models.TextChoices):
        """ Choices for gender field """
        KR = ("kr", "Korean",)
        EN = ("en", "English",)

    username_validator = UnicodeUsernameValidator()

    is_staff = models.BooleanField(default=False,
                                   help_text="Designates whether the user can log into this admin site.",)
    is_active = models.BooleanField(default=True, help_text=(
            "Designates whether this user should be treated as active. "
            "Unselect this instead of deleting accounts."
        ),
    )

    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    username = models.CharField(max_length=150,
                                unique=True,
                                help_text="Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.",
                                validators=[username_validator],
                                error_messages={"unique": "A user with that username already exists."},
                                )
    avatar = models.ImageField(upload_to="avatars", blank=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    language = models.CharField(max_length=2, choices=LanguageChoices.choices, default="en")
    company = models.ForeignKey("occupations.Company",
                                related_name="users",
                                on_delete=models.SET_NULL,
                                null=True,)
    department = models.ForeignKey("occupations.Department",
                                   related_name="users",
                                   on_delete=models.SET_NULL,
                                   null=True,)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "phone"]

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name
