"""capstone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
# from django.urls import include, path

# urlpatterns = [
#     path("admin/", admin.site.urls),
#     path("", include("bolus_pal.urls")), # change to bolus_pal
# ]

from django.contrib import admin
from django.urls import include, path
from rest_framework import routers
from bolus_pal import views
from rest_framework_jwt.views import obtain_jwt_token


router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet) # all users
router.register(r'high_thresholds', views.HighThresholdViewSet)
router.register(r'low_thresholds', views.LowThresholdViewSet)
router.register(r'carbs_per_units', views.CarbsPerUnitViewSet)
router.register(r'boluses', views.BolusViewSet)
router.register(r'days', views.DayViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path("admin/", admin.site.urls),
    # path("", include("bolus_pal.urls")),
    path("", include("bolus_pal_frontend.urls")),
    path("boluses", include("bolus_pal_frontend.urls")),
    path("profile", include("bolus_pal_frontend.urls")),
    path("login", include("bolus_pal_frontend.urls")),
    path("register", include("bolus_pal_frontend.urls")),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token-auth/', obtain_jwt_token),
]