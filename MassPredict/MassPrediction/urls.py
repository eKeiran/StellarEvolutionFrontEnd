from django.urls import path
from . import views

urlpatterns = [
    path('predict/', views.predict_stellar_data, name='predict'),
]
