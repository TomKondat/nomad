from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from .serializers import UserSignupSerializer, UserInfoSerializer, UserProfileInfoSerializer
from .models import UserProfile
from rest_framework.views import APIView
# Create your views here.

# get all the profiles except the one of the user that is logged in
@api_view(['GET'])
def getProfiles(request):
    user = request.GET.get('q', None)
    profiles = UserProfile.objects.all().exclude(user=user)
    serializer = UserProfileInfoSerializer(profiles, many=True)
    return Response(serializer.data)

# get the image of the profile of the user that you send message to
@api_view(['GET'])
def getReceiverProfileImage(request):
    user = request.GET.get('q', None)
    profile = User.objects.get(username=user)
    profile = UserProfile.objects.get(user=profile)
    serializer = UserProfileInfoSerializer(profile)
    return Response(serializer.data)

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

class ProfileView(APIView):
    def get(self, request):
        reqUser = request.GET.get('q', None)
        user = User.objects.get(id=reqUser)
        user_data = UserInfoSerializer(user).data
        user_profile_data = UserProfileInfoSerializer(UserProfile.objects.get(user=user)).data

        return Response({'user_data': user_data, 'user_profile_data': user_profile_data})

    def put(self, request):
        user_data = request.data["user_data"]
        user_profile_data = request.data["user_profile_data"]

        # Enrich data
        user_data["username"] = User.objects.get(id=request.GET.get('q', None)).username
        user_profile_data["user"] = request.GET.get('q', None)

        user_serializer = UserInfoSerializer(User.objects.get(id=request.GET.get('q', None)), data=request.data["user_data"])
        user_profile_serializer = UserProfileInfoSerializer(UserProfile.objects.get(user=request.GET.get('q', None)), data=request.data["user_profile_data"])

        u_valid = user_serializer.is_valid()
        p_valid = user_profile_serializer.is_valid()

        if not u_valid:
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        if not p_valid:
            return Response(user_profile_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user_serializer.save()
        user_profile_serializer.save()
        return Response({'message': 'Profile edited successfully'}, status=status.HTTP_200_OK)




