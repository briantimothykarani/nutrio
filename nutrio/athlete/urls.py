
from django.urls import path
from . import views

app_name = 'athlete'  
urlpatterns = [
   
    path('view_athlete/', views.view_athlete, name='view_athlete'),
    path('add_athlete/', views.add_athlete, name='add_athlete'),
    path('delete_athlete/<int:id>/', views.delete_athlete, name='delete_athlete'),
    path('update_athlete/<int:id>/', views.update_athlete, name='update_athlete'),
    # other paths
]
