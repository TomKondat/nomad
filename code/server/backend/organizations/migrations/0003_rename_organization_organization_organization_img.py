# Generated by Django 4.1.7 on 2023-05-02 16:17

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0002_organization_organization'),
    ]

    operations = [
        migrations.RenameField(
            model_name='organization',
            old_name='organization',
            new_name='organization_img',
        ),
    ]
