from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('birthdate', 'address')

class UserSignupSerializer(serializers.ModelSerializer):
    profile = UserProfileSignupSerializer(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        print(validated_data)
        profile_data = validated_data.pop('profile')
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        user = User.objects.create_user(username, email, password, **validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user
