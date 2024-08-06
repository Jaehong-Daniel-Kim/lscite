# Generated by Django 5.0.7 on 2024-08-06 03:00

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('emails', '0002_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='sender',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='mail_sent', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='emailattachment',
            name='email',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attachments', to='emails.email'),
        ),
        migrations.AddField(
            model_name='emailrecipient',
            name='email',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='recipients', to='emails.email'),
        ),
        migrations.AddField(
            model_name='emailrecipient',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
