from django.db import models
from organizations.models import Organization
from django.contrib.auth.models import User


class Conventions(models.Model):
    organization_id = models.ForeignKey(Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=512, blank=True)
    address = models.CharField(max_length=64)
    capacity = models.IntegerField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    convention_img = models.ImageField(
        upload_to='conventions', default="conventions/no-image-icon-21.png")


class Registration(models.Model):
    user = models.ForeignKey(Conventions, on_delete=models.CASCADE)
    convention = models.ForeignKey(User, on_delete=models.CASCADE)
    registration_date = models.DateField()
    location_public = models.BooleanField(default=False)
