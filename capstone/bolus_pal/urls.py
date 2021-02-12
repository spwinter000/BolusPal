from django.urls import path
from . import views
from rest_framework_simplejwt import views as jwt_views
from .views import current_user, ObtainTokenPairView, CustomUserCreate, HelloWorldView
# from . import current_user, UserList


urlpatterns = [
    # path("", views.index, name="index"),
    # path("login", views.login_view, name="login"),
    # path("logout", views.logout_view, name="logout"),
    # path("register", views.register, name="register"),
    # path('current_user/', views.current_user),
    # path('users/', views.UserList.as_view()),
    path('current_user/', current_user),
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('token/obtain/', ObtainTokenPairView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world')
]
