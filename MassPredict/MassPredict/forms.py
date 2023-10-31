from django import forms
from .models import StellarData

class StellarDataForm(forms.ModelForm):
    class Meta:
        model = StellarData
        fields = ['bv', 'plx', 'vmag', 'spType']
