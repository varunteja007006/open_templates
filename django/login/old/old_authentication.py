from django.contrib.auth.models import User
from rest_framework.request import Request
from rest_framework.authtoken.models import Token
from oauth2_provider.models import get_access_token_model
from rest_framework.authentication import BaseAuthentication


class CombinedCookieAuthentication(BaseAuthentication):
    def authenticate(self, request: Request):
        # First, check for the JWT token in cookies
        access_token = request.COOKIES.get("access_token") or request.headers.get(
            "Authorization"
        )
        token = request.COOKIES.get("token") or request.headers.get("Authorization")

        # Default django token authentication
        if token:
            try:
                user = Token.objects.get(key=token).user
                return user, token
            except Exception:
                return None

        if access_token:
            # Try authenticating as Simple JWT token
            user, validated_token = self.authenticate_jwt(access_token)
            if user and validated_token:
                return user, validated_token

            # If Simple JWT authentication fails, try social authentication
            user, validated_token = self.authenticate_social(access_token)
            if user and validated_token:
                return user, validated_token

        # If no valid access token, return None (no authentication)
        return None

    def authenticate_jwt(self, access_token: str):
        """Authenticate using Simple JWT"""
        try:
            validated_token = self.get_validated_token(access_token)
            user = self.get_user(validated_token)
            return user, validated_token
        except Exception as e:
            return None, None

    def authenticate_social(self, access_token: str):
        """Authenticate using social login token"""
        try:
            # Assuming the social token is linked to an access token model
            access_token_model = get_access_token_model()
            token = access_token_model.objects.get(token=access_token)
            if token.is_valid():  # Validate the token (e.g., check expiration)
                user = User.objects.get(id=token.user_id)
                return user, token
            else:
                return None, None
        except Exception as e:
            return None, None

    def get_validated_token(self, access_token):
        """Simple JWT token"""
        from rest_framework_simplejwt.authentication import JWTAuthentication

        jwt_auth = JWTAuthentication()
        validated_token = jwt_auth.get_validated_token(access_token)
        return validated_token

    def get_user(self, validated_token):
        """Simple JWT token"""
        from rest_framework_simplejwt.authentication import JWTAuthentication

        jwt_auth = JWTAuthentication()
        user = jwt_auth.get_user(validated_token)
        return user
