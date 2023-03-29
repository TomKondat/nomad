from django.db import models
from organizations.models import Organization


class Conventions(models.Model):
    organization_id = models.ForeignKey(
        Organization, on_delete=models.CASCADE)
    name = models.CharField(max_length=64)
    description = models.CharField(max_length=512, blank=True)
    address = models.CharField(max_length=64)
    capacity = models.IntegerField(blank=True)
    start_date = models.DateField()
    end_date = models.DateField()

    # TODO: Find a way to add logo picture to this model
