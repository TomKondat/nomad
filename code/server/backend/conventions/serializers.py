from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Conventions, Registration

class ConventionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conventions
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration    
        fields = '__all__'

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)
