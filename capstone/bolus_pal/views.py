from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import datetime

from .models import CustomUser, Bolus, Day

# rest framework and serialize imports
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, CustomUserSerializer, BolusSerializer, DaySerializer

# function to be used anytime the user revisits the site, reloads the page, or does anything else that causes React to forget its state. 
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = CustomUserSerializer(request.user)
    return Response(serializer.data)

# dummy view to test JWT
class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)

class ObtainTokenPairView(TokenObtainPairView):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class CustomUserCreate(APIView):
    """
    Create a new user. It's called 'UserList' because normally we'd have a get
    method here too, for retrieving a list of all User objects.
    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format='json'):
        serializer = CustomUserSerializer(data=request.data)
        # serializer = CustomUserSerializer(data=request.data, context={'request': None})
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def get_current_user(self):
    #     user = self.request.user
    #     return Users.objects.filter(user=user)

# class HighThresholdViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows high thresholds to be viewed or edited.
#     """
#     queryset = High_threshold.objects.all()
#     serializer_class = HighThresholdSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class LowThresholdViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows low thresholds to be viewed or edited.
#     """
#     queryset = Low_threshold.objects.all()
#     serializer_class = LowThresholdSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class CarbsPerUnitViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows carbs per unit number to be viewed or edited.
#     """
#     queryset = Carbs_per_unit.objects.all()
#     serializer_class = CarbsPerUnitSerializer
#     permission_classes = [permissions.IsAuthenticated]

class BolusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows boluses to be viewed or edited.
    """
    queryset = Bolus.objects.all().order_by('-timestamp')
    serializer_class = BolusSerializer
    permission_classes = [permissions.IsAuthenticated]

class DayViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows days to be viewed or edited.
    """
    queryset = Day.objects.all()
    serializer_class = DaySerializer
    permission_classes = [permissions.IsAuthenticated]


def index(request):
    return render(request, "bolus_pal/index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "bolus_pal/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "bolus_pal/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "bolus_pal/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "bolus_pal/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "bolus_pal/register.html")
