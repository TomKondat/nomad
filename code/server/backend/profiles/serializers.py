from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile

class UserProfileInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class UserProfileSignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        exclude = ('user',)

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password',)

class UserSignupSerializer(serializers.ModelSerializer):
    profile = UserProfileSignupSerializer(required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name', 'profile')
        extra_kwargs = {'password': {'write_only': True}, 'first_name': {'required': True}, 'last_name': {'required': True}}

    def create(self, validated_data):
        print(validated_data)
        profile_data = validated_data.pop('profile')
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')
        user = User.objects.create_user(username, email, password, **validated_data)
        UserProfile.objects.create(user=user, **profile_data)
        return user

class UserProfileInfoTomSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer()
    class Meta:
        model = UserProfile
        fields = '__all__'
