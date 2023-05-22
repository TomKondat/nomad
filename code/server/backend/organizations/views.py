from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import OrganizationSerializer
from .models import Organization

# Create your views here.

class OrganizationView(APIView):
    def get(self, request):
        organizations = Organization.objects.all()
        data = []

        for organization in organizations:
            serializer = OrganizationSerializer(organization)
            data.append(serializer.data)

        return Response(data)
