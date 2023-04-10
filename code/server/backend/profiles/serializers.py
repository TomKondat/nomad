from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserSignupProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('birthdate', 'address')

class UserSignupSerializer(serializers.ModelSerializer):
    profile = UserSignupProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        profile_data = validated_data.pop('profile')
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user, **profile_data)
        return user

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']
