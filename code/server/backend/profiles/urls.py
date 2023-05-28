from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import SignUpView, WhoamiView, ProfileView
from . import views
urlpatterns = [
    path('profile', ProfileView.as_view()),
    path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('signup', SignUpView.as_view()),
    path('whoami', WhoamiView.as_view()),
    path('get-profiles/', views.getProfiles),
]
