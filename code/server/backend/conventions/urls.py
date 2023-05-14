from django.urls import path
from . import views
urlpatterns = [

    path('get-conventions/', views.getConventions),
    path('get-convention/', views.getConvention),
    path('convention/', views.create_convention),
]
