from django.shortcuts import render
from .models import UserProfile
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getProfiles(request):
    reqUser = request.GET.get('q', None)

    profile = UserProfile.objects.all().values()
    if profile is not None:
        user = User.objects.all().values().filter(id=reqUser)[0]
        profile = profile.filter(user_id=reqUser)[0]
        profile['user'] = user
    return Response(profile)
