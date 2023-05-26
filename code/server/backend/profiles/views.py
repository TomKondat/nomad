from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from .serializers import UserSignupSerializer, UserInfoSerializer, UserProfileInfoSerializer
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
        user = User.objects.get(username=request.user)
        user_data = UserInfoSerializer(user).data
        user_profile_data = UserProfileInfoSerializer(UserProfile.objects.get(user=user)).data

        return Response({'auth': str(request.user), 'user_data': user_data, 'user_profile_data': user_profile_data})

class getProfiles(APIView):
    def get(self, request):
        reqUser = request.GET.get('q', None)
        user = User.objects.get(id=reqUser)
        user_data = UserInfoSerializer(user).data
        user_profile_data = UserProfileInfoSerializer(UserProfile.objects.get(user=user)).data

        return Response({'user_data': user_data, 'user_profile_data': user_profile_data})
