from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthdate = models.DateField()
    address = models.CharField(max_length=64)
    company = models.CharField(max_length=64)
    position = models.CharField(max_length=64)
    is_organizer = models.BooleanField(default=False)
    lat = models.DecimalField('last known latitude',
                              max_digits=9, decimal_places=6, null=True)
    lon = models.DecimalField('last known longitude',
                              max_digits=9, decimal_places=6, null=True)
    profile_img = models.ImageField(
        upload_to='profiles', default='conventions/no-image-icon-21.png')

