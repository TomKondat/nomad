from django.urls import path
from . import views
urlpatterns = [

    path('get-conventions/', views.getConventions),
    path('get-convention/', views.getConvention),
    path('convention/', views.create_convention),
    path('update-convention/', views.update_convention),
    path('register/', views.register),
    path('unregister/', views.unregister),
    path('is-registered/', views.isRegistered),
    path('registered-users/', views.getRegisteredUsers),
]
