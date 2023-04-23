from django.shortcuts import render
from .models import UserProfile
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getProfiles(request):
    profile = UserProfile.objects.all().values()[0]
    print(profile['user_id'])
    return Response(profile)
