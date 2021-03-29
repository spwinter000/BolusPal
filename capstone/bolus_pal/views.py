from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.urls import reverse
import datetime

from .models import User, UserInfo, Bolus, Food, Day

# rest framework and serialize imports
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, UserSerializer, UserInfoSerializer, BolusSerializer, FoodSerializer, DaySerializer

# function to be used anytime the user revisits the site, reloads the page, or does anything else that causes React to forget its state. 
@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# dummy view to test JWT
class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello":"world"}, status=status.HTTP_200_OK)

class ObtainTokenPairView(TokenObtainPairView):
    # permission_classes = (permissions.AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class UserCreate(APIView):
    """
    Create a new user.

    """
    authentication_classes = (TokenAuthentication,)
    permission_classes = (permissions.AllowAny,)

    # create new user, then create new 'user_info' instance with new user as the 'user' field
    def post(self, request, format='json'):
        user_serializer = UserSerializer(data=request.data)

        if user_serializer.is_valid():
            user = user_serializer.save()
            
            user_id = user.id
            
            userinfo_serializer = UserInfoSerializer(data={'user': user_id, 'high_threshold': 120, 'low_threshold': 80, 'carbs_per_unit': 10})
            
            if userinfo_serializer.is_valid():
                user_info = userinfo_serializer.save()
            
            if user:
                json = user_serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
            if user_info:
                json = userinfo_serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors, userinfo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


        # if userinfo_serializer.is_valid():
        #     user = userinfo_serializer.save()
        #     if user:
        #         json = userinfo_serializer.data
        #         return Response(json, status=status.HTTP_201_CREATED)
        # return Response(userinfo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # original 
        # if user_serializer.is_valid():
        #     user = user_serializer.save()
        #     if user:
        #         json = user_serializer.data
        #         return Response(json, status=status.HTTP_201_CREATED)
        # return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # def get_current_user(self):
    #     user = self.request.user
    #     return Users.objects.filter(user=user)

class UserInfoViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows user info to be viewed or edited.
    """
    # timestamp = datetime
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer
    permission_classes = [permissions.IsAuthenticated]

class BolusViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows boluses to be viewed or edited.
    """
    # timestamp = datetime
    queryset = Bolus.objects.all().order_by('-timestamp')
    serializer_class = BolusSerializer
    permission_classes = [permissions.IsAuthenticated]

class FoodViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows foods to be viewed or edited.
    """
    # timestamp = datetime
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
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
