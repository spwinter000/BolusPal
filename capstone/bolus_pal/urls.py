
from django.urls import path
from . import views
# from . import current_user, UserList


urlpatterns = [
    # path("", views.index, name="index"),
    # path("login", views.login_view, name="login"),
    # path("logout", views.logout_view, name="logout"),
    # path("register", views.register, name="register"),
    path('current_user/', current_user),
    path('users/', UserList.as_view())
]
