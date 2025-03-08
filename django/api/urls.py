from django.urls import path, include

# add all the urls here

urlpatterns = [
    path("auth/v1/", include("login.urls")),
]