# Generated by Django 5.0.1 on 2024-01-06 17:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0005_menuitem_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartitem',
            name='active',
            field=models.BooleanField(default=True),
        ),
    ]
