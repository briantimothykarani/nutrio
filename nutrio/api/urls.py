from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import (
    AthleteList,
    AthleteListCreate,
    AthleteDelete,
    AthleteSavePlansAPIView,
    AthleteSummaryAPIView,
    AthleteUpdate,
    CurrentUserAPIView,
    UserRegisterAPIView,
    csrf_cookie_view,

)


urlpatterns = [
    path('AthleteListCreate/', AthleteListCreate.as_view(), name='AthleteListCreate'),
    path('AthleteList/', AthleteList.as_view(), name='AthleteApiList'),
    path('AthleteUpdate/<int:id>/', AthleteUpdate.as_view(), name='AthleteUpdate'),
    path('AthleteDelete/<int:pk>/', AthleteDelete.as_view(), name='AthleteDelete'),
    path('AthleteSummaryApiView/<int:id>/',AthleteSummaryAPIView.as_view(),name='AthleteSummaryApiView'),
    path('AthleteSavePlans/<int:id>/', AthleteSavePlansAPIView.as_view(), name='AthleteSavePlans'),

    path('current_user/', CurrentUserAPIView.as_view(), name='current-user'),
    path('register/', UserRegisterAPIView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('csrf/', csrf_cookie_view, name='csrf-cookie'),
]