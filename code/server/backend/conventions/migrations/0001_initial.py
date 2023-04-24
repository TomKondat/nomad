# Generated by Django 4.1.7 on 2023-04-24 12:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('organizations', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Conventions',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=64)),
                ('description', models.CharField(blank=True, max_length=512)),
                ('address', models.CharField(max_length=64)),
                ('capacity', models.IntegerField(blank=True)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('convention_img', models.ImageField(upload_to='conventions')),
                ('organization_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='organizations.organization')),
            ],
        ),
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registration_date', models.DateField()),
                ('location_public', models.BooleanField(default=False)),
                ('convention', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='conventions.conventions')),
            ],
        ),
    ]
