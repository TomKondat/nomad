from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import UserSignupSerializer
from .models import UserProfile

# Create your views here.

class SignUpView(APIView):
    def post(self, request):
        serializer = UserSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WhoamiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'auth': str(request.user)})

class getProfiles(APIView):
    def get(self, request):
        reqUser = request.GET.get('q', None)

        profile = UserProfile.objects.all().values()
        if profile is not None:
            user = User.objects.all().values().filter(id=reqUser)[0]
            profile = profile.filter(user_id=reqUser)[0]
            profile['user'] = user
        return Response(profile)
