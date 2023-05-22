from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Conventions, Organization
from .serializers import ConventionSerializer


@api_view(['POST'])
def create_convention(request):
    serializer = ConventionSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Convention created successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        organization = Organization.objects.all().values().filter(
            id=convention['organization_id_id'])[0]
        convention['organization'] = organization
    return Response(convention)
