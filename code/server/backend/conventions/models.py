from django.db import models
from organizations.models import Organization
from django.contrib.auth.models import User


class Conventions(models.Model):
    organization_id = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=512, blank=True)
    address = models.CharField(max_length=64)
    capacity = models.IntegerField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    convention_img = models.ImageField(upload_to='conventions')

    # TODO: Find a way to add logo picture to this model


class Registration(models.Model):
    user = models.ForeignKey(Conventions, on_delete=models.CASCADE)
    convention = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_date = models.DateField()
    location_public = models.BooleanField(default=False)
