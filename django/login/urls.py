from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("sign-up/", views.sign_up_view, name="sign-up"),
    path("logout/", views.logout_view, name="logout"),
    path("test-token/", views.test_token_view, name="test-token"),
    path("google-login/", views.google_login_view, name="google-login"),
    path("validate-token/", views.validate_token_view, name="validate-token"),
]
