# Generated by Django 4.1.7 on 2023-05-01 20:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0003_alter_userprofile_profile_img'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='company',
            field=models.CharField(default=1, max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='userprofile',
            name='position',
            field=models.CharField(default=1, max_length=64),
            preserve_default=False,
        ),
    ]
