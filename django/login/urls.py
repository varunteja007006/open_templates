from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("sign-up/", views.sign_up_view, name="sign-up"),
    path("logout/", views.logout_view, name="logout"),
    path("test-token/", views.test_token_view, name="test-token"),
    path("oauth-login/", views.oauth_login_view, name="oauth-login"),
    path("validate-token/", views.validate_token_view, name="validate-token"),
]
