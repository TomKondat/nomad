from rest_framework import serializers
from .models import Conventions, Registration

class ConventionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conventions
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration    
        fields = '__all__'
