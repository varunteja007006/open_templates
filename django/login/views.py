import requests

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model

from allauth.socialaccount.models import SocialAccount
from allauth.account.models import EmailAddress
from rest_framework_simplejwt.tokens import RefreshToken

IS_HTTP_ONLY = True
IS_SECURE = True
IS_SAME_SITE = "None"
ACCESS_TOKEN_AGE=60*5 # 5 minutes
REFRESH_TOKEN_AGE=60*60*24*7 # 7 days

@api_view(['GET'])
def login_view(request):
    return Response({'message': 'Login page'})

@api_view(['GET'])
def sign_up_view(request):
    return Response({'message': 'Sign-up page'})

@api_view(['GET'])
def logout_view(request):
    return Response({'message': 'Logout page'})

@api_view(['POST'])
@permission_classes([AllowAny])
def google_login_view(request):
    """
    This view handles the Google OAuth token and converts it to a user object
    """
    
    User = get_user_model()
    google_token = request.data.get('token')
    
    if not google_token:
        return Response({"error": "Token is required"}, status=400)
    
    try:
        # Directly verify the token with Google
        response = requests.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            headers={'Authorization': f'Bearer {google_token}'}
        )
        
        if response.status_code != 200:
            return Response({"error": f"Invalid token: {response.text}"}, status=400)
        
        # Extract user data from Google's response
        google_data = response.json()
        google_user_id = google_data.get('sub')  # 'sub' is Google's unique user ID
        email = google_data.get('email')
        
        if not google_user_id or not email:
            return Response({"error": "Failed to get required user info from Google"}, status=400)
        
        # Check if we already have a social account for this Google user
        try:
            social_account = SocialAccount.objects.get(provider='google', uid=google_user_id)
            user = social_account.user
        except SocialAccount.DoesNotExist:
            # No existing social account, check if we have a user with this email
            try:
                user = User.objects.get(email=email)
                # Create social account connected to this existing user
                SocialAccount.objects.create(
                    user=user,
                    provider='google',
                    uid=google_user_id,
                    extra_data=google_data
                )
            except User.DoesNotExist:
                # Create a new user
                username = email.split('@')[0]
                # Ensure username is unique
                base_username = username
                counter = 1
                while User.objects.filter(username=username).exists():
                    username = f"{base_username}{counter}"
                    counter += 1
                
                # Create the user
                user = User.objects.create_user(
                    username=username,
                    email=email,
                    # Optionally set first_name, last_name if provided by Google
                    first_name=google_data.get('given_name', ''),
                    last_name=google_data.get('family_name', ''),
                )
                
                # Create social account for the new user
                SocialAccount.objects.create(
                    user=user,
                    provider='google',
                    uid=google_user_id,
                    extra_data=google_data
                )
                
                # Create verified email address
                EmailAddress.objects.create(
                    user=user,
                    email=email,
                    verified=True,
                    primary=True
                )
        
        # Generate authentication token
        token, created = Token.objects.get_or_create(user=user)
        refresh = RefreshToken.for_user(user)

        # Generate refresh token if you need one
        refresh_token = None  # Replace with your refresh token logic if needed
        
        # Create response
        response = Response({
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name
            }
        })
        
        # Set cookies
        response.set_cookie(
            'access_token', str(refresh.access_token), 
            max_age=ACCESS_TOKEN_AGE,  
            httponly=IS_HTTP_ONLY, 
            secure=IS_SECURE, 
            samesite=IS_SAME_SITE
        )
        
        response.set_cookie(
            'refresh_token', str(refresh), 
            max_age=REFRESH_TOKEN_AGE,
            httponly=IS_HTTP_ONLY, 
            secure=IS_SECURE, 
            samesite=IS_SAME_SITE
        )
        
        return response
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        return Response({"error": f"An error occurred: {str(e)}"}, status=400)

@api_view(['GET'])
def test_token_view(request):
    return Response({'message': 'Test token page'})

@api_view(['GET'])
@permission_classes([AllowAny])
def validate_token_view(request):
    if request.user.is_authenticated:
        user_data = {
            "email": request.user.email,
            "full_name": request.user.get_full_name(),
            "isAuthenticated": request.user.is_authenticated,
        }
        return Response(user_data, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)    

