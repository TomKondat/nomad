import datetime

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Conventions, Organization, Registration
from .serializers import ConventionSerializer,RegistrationSerializer


@api_view(['POST'])
def create_convention(request):
    serializer = ConventionSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Convention created successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_convention(request):
    data = request.data
    convention = Conventions.objects.get(id=data['id'])
    data['organization_id'] = convention.organization_id.id
    serializer = ConventionSerializer(instance=convention, data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Convention updated successfully'}, status=status.HTTP_200_OK)

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

# send a user and convention id to register a user for a convention
@api_view(['POST'])
def register(request):
    data = request.data
    data["convention"] = request.GET.get('q', None)
    data["registration_date"] = datetime.datetime.now()

    # Check if user is already registered for this convention
    if Registration.objects.filter(user=data["user"], convention=data["convention"]).exists():
        return Response({'message': 'User already registered for this convention'}, status=status.HTTP_400_BAD_REQUEST)

    serializer = RegistrationSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'Registration created successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
