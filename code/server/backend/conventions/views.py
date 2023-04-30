from django.shortcuts import render
from .models import Conventions
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def getConventions(request):
    convention = Conventions.objects.all().values()
    return Response(convention)


@api_view(['GET'])
def getConvention(request):
    reqConvention = request.GET.get('q', None)
    convention = Conventions.objects.all().values()
    if reqConvention is not None:
        convention = convention.filter(id=reqConvention)[0]
    return Response(convention)
