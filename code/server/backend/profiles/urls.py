from django.urls import path
from . import views
urlpatterns = [

    path('get-profiles/', views.getProfiles),
]
