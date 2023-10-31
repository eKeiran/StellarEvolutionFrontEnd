from django.http import JsonResponse
import pandas as pd
import numpy as np
import joblib
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def predict_stellar_data(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            # Perform calculations (Temperature and Absolute Magnitude)
            bv = float(data.get('bv'))
            plx = float(data.get('plx'))
            vmag = float(data.get('vmag'))
            spType = data.get('spType')

            # Calculate Absolute Magnitude
            absolute_mag = (vmag + 5 * (np.log10(plx/100)))

            # Calculate Temperature
            #temperature = 4600 * (1 / (0.92 * bv + 1.7) + 1 / (0.92 * bv + 0.62))

            def estimate_temperature(BV):
                if BV < -0.5:
                    temperature = 10000  # Hot stars, e.g., O-type
                elif -0.5 <= BV < 0.2:
                    temperature = 10000 - 5000 * (BV + 0.5)  # Linear decrease from 10,000 K to 5,000 K
                elif 0.2 <= BV < 1.5:
                    temperature = 5000 - 4000 * (BV - 0.2)  # Linear decrease from 5,000 K to 1,000 K
                else:
                    temperature = 500  # Cool stars, e.g., M-type
                
                return temperature
            temperature = estimate_temperature(bv)
            temperature = np.log10(temperature)
            # Load spectral type mapping
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
            
            model = joblib.load('C:/Users/keera/Desktop/StellarEvolutionFrontEnd/MassPredict/MassPrediction/MassPredictionModels/Gradient Boosting.pkl')

            input_data = pd.DataFrame({
                'B-V': [bv],
                'Absolute Mag': [absolute_mag],
                'Vmag': [vmag],
                'PSpT': [predicted_spType],
                'log.Teff [K]': [temperature],
            })

            mass_prediction = model.predict(input_data)

            predictions = {
                'mass_range': float(mass_prediction[0]),
                'temperature': float(temperature),
                'absolute_mag': float(absolute_mag),
                'predicted_spType': predicted_spType
            }

            
        
            def mass_range_from_prediction(prediction):
                if prediction == 0:
                    return "Your star's mass ranges from 0 to 0.2 solar masses."
                elif prediction == 1:
                    return "Your star's mass ranges from  0.2 to 0.65 solar masses."
                elif prediction == 2:
                    return "Your star's mass ranges from  0.65 to 1 solar mass."
                elif prediction == 3:
                    return "Your star's mass ranges from 1 to 2 solar masses."
                elif prediction == 4:
                    return "Your star's mass ranges from 2 to 4 solar masses."
                elif prediction == 5:
                    return "Your star's mass ranges from  4 to 6 solar masses."
                elif prediction == 6:
                    return "Your star's mass ranges from  6 to 10 solar masses."
                elif prediction == 7:
                    return "Your star's mass ranges from  10 to 20 solar masses."
                elif prediction == 8:
                    return "Your star's mass ranges from 20 to 30 solar masses."
                elif prediction == 9:
                    return "Your star's mass ranges from 30 to 300 solar masses."
                else:
                    return "Invalid prediction or unknown mass range."
            mass_range_description = mass_range_from_prediction(mass_prediction)
            predictions['mass_range'] = mass_range_description
            return JsonResponse(predictions)
        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

    return JsonResponse({'error': 'Invalid request method'}, status=400)
from django.http import JsonResponse
from django.middleware.csrf import get_token


def get_csrf_token(request):
    csrf_token = get_token(request)
    return JsonResponse({'csrf_token': csrf_token})