from django.urls import path
from . import views

urlpatterns = [
    path('get-ngrams/', views.get_ngrams, name='get_ngrams'),
]

