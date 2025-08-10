from django.urls import path
from . import views

app_name = 'openapi'

urlpatterns = [
    path('generate-summary/<int:id>/', views.generate_athlete_summary, name='generate_summary'),
]