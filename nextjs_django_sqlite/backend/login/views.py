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
from .serializer import CustomTokenObtainPairViewSerializer
from drf_social_oauth2.views import ConvertTokenView
from oauth2_provider.models import get_refresh_token_model, get_access_token_model
from oauthlib.common import generate_token
from django.utils import timezone
from django.db import transaction
from django.core.exceptions import ValidationError

isHTTPOnly = True
isSecure = True
isSameSite = "None"
isPath = "/"
minutes = 15
days_30 = 30
days_1 = 1


class CustomConvertTokenView(ConvertTokenView):
    permission_classes = [AllowAny]

    with transaction.atomic():

        def post(self, request, *args, **kwargs):
            try:
                # user info will go here, gets validated and returns the tokens
                response = super().post(request, *args, **kwargs)

                tokens = response.data
                user_email = tokens["user"]["email"]
                user_email_lower = user_email.lower()

                # Check for existing user by email and user from google signup

                user_already = User.objects.filter(
                    username=user_email or user_email_lower
                )

                google_signup_user = User.objects.filter(
                    email=user_email or user_email_lower
                ).exclude(username=user_email or user_email_lower)

                if user_already.exists() and google_signup_user.exists():
                    # If user already exists, delete the google signup user
                    google_signup_user.delete()
                    raise ValidationError(
                        "User already exists, please login with email and password"
                    )

                elif google_signup_user.exists():
                    google_user_instance = google_signup_user.first()
                    print(
                        "google_user_instance",
                        google_user_instance.email,
                        google_user_instance.username,
                        user_email_lower,
                    )
                    google_user_instance.email = user_email_lower
                    google_user_instance.username = user_email_lower
                    google_user_instance.save()

                # check for tokens
                if "access_token" in tokens and "refresh_token" in tokens:
                    access_token = tokens["access_token"]
                    refresh_token = tokens["refresh_token"]

                    # set cookies for both access and refresh
                    response.set_cookie(
                        key="access_token",
                        value=access_token,
                        httponly=isHTTPOnly,
                        secure=isSecure,
                        samesite=isSameSite,
                        path=isPath,
                        expires=datetime.now() + timedelta(minutes=minutes),
                    )

                    response.set_cookie(
                        key="refresh_token",
                        value=refresh_token,
                        httponly=isHTTPOnly,
                        secure=isSecure,
                        samesite=isSameSite,
                        path=isPath,
                        expires=datetime.now() + timedelta(days=days_30),
                    )
                else:
                    return Response(
                        {"error": "Token generation failed"},
                        status=status.HTTP_400_BAD_REQUEST,
                    )

                response.data = {
                    "success": True,
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                }

                response.status_code = status.HTTP_200_OK

                return response
            except Exception as e:
                res = Response()
                res.delete_cookie("token")
                res.delete_cookie("access_token")
                res.delete_cookie("refresh_token")
                res.data = {"error": str(e)}
                res.status_code = status.HTTP_400_BAD_REQUEST
                return res


class CustomTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]
    serializer_class = CustomTokenObtainPairViewSerializer

    def post(self, request, *args, **kwargs):
        try:
            # user info will go here, gets validated and returns the tokens
            response = super().post(request, *args, **kwargs)

            tokens = response.data

            # check for tokens
            if "access" in tokens and "refresh" in tokens:
                access_token = tokens["access"]
                refresh_token = tokens["refresh"]

                # set cookies for both access and refresh
                response.set_cookie(
                    key="access_token",
                    value=access_token,
                    httponly=isHTTPOnly,
                    secure=isSecure,
                    samesite=isSameSite,
                    path=isPath,
                    expires=datetime.now() + timedelta(minutes=minutes),
                )

                response.set_cookie(
                    key="refresh_token",
                    value=refresh_token,
                    httponly=isHTTPOnly,
                    secure=isSecure,
                    samesite=isSameSite,
                    path=isPath,
                    expires=datetime.now() + timedelta(days=days_30),
                )

            response.data = {
                "success": True,
                "access_token": access_token,
                "refresh_token": refresh_token,
            }

            response.status_code = status.HTTP_200_OK

            return response

        except KeyError as e:
            return Response(
                {"error": f"Missing token: {str(e)}"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            # get the refresh token from the cookies and attach it to the request body
            refresh_token = request.COOKIES.get("refresh_token")

            if not refresh_token:
                raise ValidationError("Refresh token missing or expired")

            request.data["refresh"] = refresh_token

            # now pass the request with refresh token to generate the access and refresh tokens
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            if "access" in tokens:
                access_token = tokens["access"]

                response.set_cookie(
                    key="access_token",
                    value=access_token,
                    httponly=isHTTPOnly,
                    secure=isSecure,
                    samesite=isSameSite,
                    path=isPath,
                    expires=datetime.now() + timedelta(minutes=minutes),
                )

            response.data = {
                "success": True,
                "access_token": access_token,
                "refresh_token": refresh_token,
            }

            response.status_code = status.HTTP_200_OK

            return response

        except Exception as e:
            res = Response()
            res.delete_cookie("token")
            res.delete_cookie("access_token")
            res.delete_cookie("refresh_token")
            res.data = {"error": str(e)}
            res.status_code = status.HTTP_400_BAD_REQUEST
            return res


@api_view(["POST"])
@permission_classes([AllowAny])
def social_token_refresh(request):
    try:
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            raise ValidationError("Refresh token missing or expired")

        refresh_token_model = get_refresh_token_model()

        refresh_token = refresh_token_model.objects.get(token=refresh_token)

        # Check if refresh token is still valid
        if refresh_token.revoked:
            raise ValidationError("Refresh token revoked")

        # Generate new access token
        access_token_model = get_access_token_model()

        new_access_token = access_token_model(
            user=refresh_token.user,
            token=generate_token(),
            application=refresh_token.application,
            expires=timezone.now()
            + timezone.timedelta(hours=1),  # Set desired expiration
            scope=refresh_token.access_token.scope,
        )
        new_access_token.save()

        response = Response(
            {
                "success": True,
                "access_token": new_access_token.token,
                "refresh_token": refresh_token,
            }
        )

        response.set_cookie(
            key="access_token",
            value=new_access_token.token,
            httponly=isHTTPOnly,
            secure=isSecure,
            samesite=isSameSite,
            path=isPath,
            expires=datetime.now() + timedelta(minutes=minutes),
        )

        response.status_code = status.HTTP_200_OK
        return response

    except Exception as e:
        res = Response()
        res.delete_cookie("token")
        res.delete_cookie("access_token")
        res.delete_cookie("refresh_token")
        res.data = {"error": str(e)}
        res.status_code = status.HTTP_400_BAD_REQUEST
        return res


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    try:
        user = get_object_or_404(User, username=request.data["username"])

        if not user.check_password(request.data["password"]):
            return Response(
                {"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST
            )

        token, _ = Token.objects.get_or_create(user=user)

        response = Response()

        response.data = {
            "success": True,
            "token": token.key,
        }

        response.set_cookie(
            key="token",
            value=token.key,
            httponly=isHTTPOnly,
            secure=isSecure,
            samesite=isSameSite,
            path=isPath,
            expires=datetime.now() + timedelta(days=days_1),
        )

        response.status_code = status.HTTP_200_OK
        return response

    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(["POST"])
@permission_classes([AllowAny])
def signup(request):
    try:
        # WE ARE USING USERNAME AS EMAIL
        # Check if the username already exists
        if User.objects.filter(username=request.data["username"]).exists():
            return Response(
                {"error": "Username already exists"}, status=status.HTTP_409_CONFLICT
            )

        # Check if the email already exists
        if User.objects.filter(email=request.data["username"]).exists():
            return Response(
                {"error": "Email already exists"}, status=status.HTTP_409_CONFLICT
            )

        email = request.data["username"].lower()

        user = User.objects.create_user(
            username=email,
            email=email,
            first_name=request.data["first_name"],
            last_name=request.data["last_name"] if "last_name" in request.data else "",
            password=request.data["password"],
        )
        user.save()

        token, _ = Token.objects.get_or_create(user=user)

        response = Response()

        response.data = {
            "success": True,
            "token": token.key,
        }

        response.set_cookie(
            key="token",
            value=token.key,
            httponly=isHTTPOnly,
            secure=isSecure,
            samesite=isSameSite,
            path=isPath,
            expires=datetime.now() + timedelta(days=days_1),
        )

        response.status_code = status.HTTP_201_CREATED
        return response

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def logout(request):
    try:
        if (
            "token" not in request.COOKIES
            and "access_token" not in request.COOKIES
            and "refresh_token" not in request.COOKIES
        ):
            return Response(
                {"error": "Token not found"}, status=status.HTTP_404_NOT_FOUND
            )

        if "token" in request.COOKIES:
            token = Token.objects.get(key=request.COOKIES.get("token"))
            if token.user.is_authenticated:
                token.delete()

        # now delete the tokens from the cookies
        res = Response()

        res.data = {"success": True}

        res.delete_cookie("token")
        res.delete_cookie("access_token")
        res.delete_cookie("refresh_token")

        res.status_code = status.HTTP_200_OK

        return res

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def validate_token(request):
    if request.user.is_authenticated:
        user_data = {
            "email": request.user.email,
            "full_name": request.user.get_full_name(),
            "isAuthenticated": request.user.is_authenticated,
        }
        return Response(user_data, status=status.HTTP_200_OK)
    else:
        return Response(
            {"error": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["POST"])
@permission_classes([IsAdminUser])
def emergency_logout(request):
    deleted_count, _ = Token.objects.all().delete()
    return Response(
        {"message": f"{deleted_count} tokens deleted."}, status=status.HTTP_200_OK
    )
