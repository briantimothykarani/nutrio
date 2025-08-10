

from django.conf.urls.static import static
from django.conf import settings
from django.urls import include, path
from django.contrib import admin
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
urlpatterns = [
    path('admin/', admin.site.urls),
    path('athlete/', include('athlete.urls')),
    path('api/',include('api.urls')),
    path('athleteauth/',include('athleteauth.urls')),  
    path('openapi/',include('openapi.urls')),
# API routes
 
 
    # Auth tokens
    path('api/token/', TokenObtainPairView.as_view(), name='get_token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh'),

    # Optional for browsable API login/logout
    path('api-auth/', include('rest_framework.urls')),
 ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)






