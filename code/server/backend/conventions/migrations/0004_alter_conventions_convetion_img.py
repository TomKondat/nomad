# Generated by Django 4.1.7 on 2023-04-20 11:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('conventions', '0003_conventions_convetion_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='conventions',
            name='convetion_img',
            field=models.ImageField(upload_to='files/covers'),
        ),
    ]
