from django.shortcuts import render
from .models import Conventions
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getConventions(request):
    convention = Conventions.objects.all().values()
    return Response(convention)
