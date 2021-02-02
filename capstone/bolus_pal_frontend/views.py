# bolus_pal_frontend views

from django.shortcuts import render

def index(request):
    return render(request, 'bolus_pal_frontend/index.html')
