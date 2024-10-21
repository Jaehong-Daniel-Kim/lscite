from django.db import models

# Create your models here.


class CommonModel(models.Model):
    """ Common Model Definition """

    class Meta:
        # abstract model will not be added to the database as a table.
        # It will be a logical model that its fields are going to be used within other models.
        abstract = True

    # auto_now_add sets the field to current time when the data is first created
    created_at = models.DateTimeField(auto_now_add=True)
    # auto_now sets the field to current time everytime data is saved (updated)
    updated_at = models.DateTimeField(auto_now=True)

