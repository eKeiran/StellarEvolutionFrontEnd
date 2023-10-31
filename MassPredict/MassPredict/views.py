from django.shortcuts import render
from django.http import JsonResponse
from .forms import StellarDataForm
import pandas as pd
import numpy as np
import joblib

def predict_stellar_data(request):
    if request.method == 'POST':
        form = StellarDataForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            print(data)
            bv = data.get('bv')
            plx = data.get('plx')
            vmag = data.get('vmag')
            spType = data.get('spType')

            #  Absolute Magnitude
            absolute_mag = (vmag + 5 * (np.log10(plx/100)))

            #  Temperature
            temperature = 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62))

            spectral_type_mapping = {
                "O": 0,
                "B": 1,
                "A": 2,
                "F": 3,
                "G": 4,
                "K": 5,
                "M": 6
            }

            # Map the user input spectral type to a numerical value
            predicted_spType = spectral_type_mapping.get(spType, -1)
            
            model = joblib.load('../../MassPredictionModels/stacking_ensemble_model.pkl')

            input_data = pd.DataFrame({
                'BV': [bv],
                'Vmag': [vmag],
                'SpType': [predicted_spType],  # Use the numerical value
                'Temperature': [temperature],
                'AbsoluteMagnitude': [absolute_mag]
            })

            mass_prediction = model.predict(input_data)

            predictions = {
                'mass': mass_prediction[0],
                'temperature': temperature,
                'absolute_mag': absolute_mag,
                'predicted_spType': predicted_spType
            }

            return JsonResponse(predictions)


        else:
            print(form.errors)

    else:
        form = StellarDataForm()

    return JsonResponse({'error': 'Invalid form data lol bye'}, status=400)

from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})
