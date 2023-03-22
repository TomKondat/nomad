from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birthdate = models.DateField()
    address = models.CharField(max_length=64)
    lat = models.DecimalField('last known latitude', max_digits=9, decimal_places=6)
    lon = models.DecimalField('last known longitude', max_digits=9, decimal_places=6)

    # TODO: Find a way to add profile picture to this model
