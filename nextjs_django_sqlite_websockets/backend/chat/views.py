from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import (
    api_view,
    permission_classes,
)
from rest_framework.permissions import IsAdminUser, AllowAny
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.shortcuts import get_object_or_404
from datetime import datetime, timedelta
from drf_social_oauth2.views import ConvertTokenView
from oauth2_provider.models import get_refresh_token_model, get_access_token_model
from oauthlib.common import generate_token
from django.utils import timezone
from django.db import transaction

from django.shortcuts import render


def home(request):
    return render(request, "home.html")


def room(request, room_name):
    return render(request, "room.html", {"room_name": room_name})
