from django.db import models
from profiles.models import User


class Organization(models.Model):

    name = models.CharField(max_length=64)

    # TODO: Find a way to add logo picture to this model


class Organizer(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
