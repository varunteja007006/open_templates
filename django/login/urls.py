from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # Token based login / signup
    path("login", views.login, name="login"),
    path("sign-up", views.signup, name="signup"),
    path("logout", views.logout, name="logout"),
    # Token based api = Header Authentication - token {token}
    path("test-token", views.validate_token, name="test_token"),
    path("validate-token", views.validate_token, name="validate_token"),
    path("emergency-logout", views.emergency_logout, name="emergency_logout"),
    # Default Access and Refresh token generating login API
    path("login/token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("login/token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    # Customized Access and Refresh token generating login API
    path(
        "login/token/v2",
        views.CustomTokenObtainPairView.as_view(),
        name="token_obtain_pair_customized",
    ),
    path(
        "login/token/refresh/v2",
        views.CustomTokenRefreshView.as_view(),
        name="token_refresh_customized",
    ),
    # social login api
    path(
        "login/token/convert/social-token/v2",
        views.CustomConvertTokenView.as_view(),
        name="social_token_convert",
    ),
    path(
        "login/token/refresh/social-token/v2",
        views.social_token_refresh,
        name="social_token_refresh",
    ),
    path(
        "login/token/combined-refresh-token/v2",
        views.CombinedTokenRefreshView.as_view(),
        name="combined_refresh_token",
    ),
]
