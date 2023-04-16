from django.urls import path
from . import views
urlpatterns = [

    path('get-conventions/', views.getConventions),
]
