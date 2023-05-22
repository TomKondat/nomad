from django.urls import path
from .views import OrganizationView

urlpatterns = [
    path('organizations', OrganizationView.as_view()),
]
