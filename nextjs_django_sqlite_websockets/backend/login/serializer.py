from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class CustomTokenObtainPairViewSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # add custom items in the token
        return token
