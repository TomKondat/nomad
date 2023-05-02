from django.db import models
from profiles.models import User


class Organization(models.Model):

    name = models.CharField(max_length=64, default="none")
    organization_img = models.ImageField(
        upload_to='organizations', default="conventions/no-image-icon-21.png")


class Organizer(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
