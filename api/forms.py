from athlete.models import Athlete
from django import forms

class StudentApiForm(forms.ModelForm):
    class Meta:
        model = Athlete
        fields = '__all__'