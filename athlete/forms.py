from .models import Athlete
from django import forms

class AthleteForm(forms.ModelForm):
    class Meta:
        model = Athlete
        fields = '__all__'
