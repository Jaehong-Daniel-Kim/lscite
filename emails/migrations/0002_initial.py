# Generated by Django 5.0.7 on 2024-08-06 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('emails', '0001_initial'),
        ('postboxes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='mail_box',
            field=models.ManyToManyField(related_name='emails', to='postboxes.postbox'),
        ),
    ]
