# Generated by Django 4.1.7 on 2023-05-02 16:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('organizations', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='organization',
            name='organization',
            field=models.ImageField(default='conventions/no-image-icon-21.png', upload_to='organizations'),
        ),
    ]
