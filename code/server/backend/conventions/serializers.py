from rest_framework import serializers
from .models import Conventions

class ConventionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conventions
        fields = '__all__'
