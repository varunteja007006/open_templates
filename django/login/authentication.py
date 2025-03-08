from rest_framework.authentication import BaseAuthentication
from rest_framework.request import Request

from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from django.contrib.auth import get_user_model

class CombinedCookieAuthentication(BaseAuthentication):
    def authenticate(self, request: Request):
        # First, check for the JWT token in cookies
        access_token = request.COOKIES.get("access_token") or request.headers.get(
            "Authorization"
        )
        refresh_token = request.COOKIES.get("refresh_token") or request.headers.get(
            "Authorization"
        )
        
        # If no tokens are provided, return None (unauthenticated)
        if not access_token:
            return None
        
        try:
            # Try to validate access token
            token = AccessToken(access_token)
            user = token.payload.get('user_id')
            user = self.get_user(user)
            return (user, token)
            
        except (InvalidToken, TokenError):
            # Access token is invalid or expired
            
            # Check if we have a refresh token to try
            if not refresh_token:
                return None
            
            # Try to refresh the token
            try:
                refresh = RefreshToken(refresh_token)
                new_access_token = refresh.access_token
                
                # Get user from the refresh token
                user_id = refresh.payload.get('user_id')
                user = self.get_user(user_id)
                
                if not user:
                    return None
                
                # Update the access token cookie
                request.COOKIES['access_token'] = str(new_access_token)
                
                return (user, new_access_token)
                
            except (InvalidToken, TokenError):
                # Refresh token is also invalid
                return None
        
        except Exception as e:
            return None
    
    def get_user(self, user_id):
        """
        Helper method to get user from user_id
        """
        User = get_user_model()
        try:
            return User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return None