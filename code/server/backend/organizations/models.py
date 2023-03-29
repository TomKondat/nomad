from django.db import models


class Organization(models.Model):

    name = models.CharField(max_length=64)

    # TODO: Find a way to add logo picture to this model
