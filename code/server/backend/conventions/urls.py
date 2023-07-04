from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [

    path('get-conventions/', views.getConventions),
    path('get-convention/', views.getConvention),
    path('convention/', views.create_convention),
    path('update-convention/', views.update_convention),
    path('delete-convention/', views.delete_convention),
    path('register/', views.register),
    path('unregister/', views.unregister),
    path('is-registered/', views.isRegistered),
    path('registered-users/', views.getRegisteredUsers),
] + static(settings.MEDIA_URL , document_root=settings.MEDIA_ROOT)

