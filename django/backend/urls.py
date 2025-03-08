from django.contrib import admin
from django.urls import path, include, re_path
from .views import HealthCheckView
from django.conf import settings
from django.conf.urls.static import static

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Schema view setup for Swagger and ReDoc
schema_view = get_schema_view(
    openapi.Info(
        title="Backend",
        default_version="v1",
        description="API documentation for backend",
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # admin urls
    path('admin/', admin.site.urls),
    
    # health check endpoint
    path("health/", HealthCheckView.as_view()),

    # allauth urls
    path('accounts/', include('allauth.urls')),
    path("_allauth/", include("allauth.headless.urls")),

    # api urls
    path("api/", include("api.urls")),

    # Swagger and ReDoc documentation URLs
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
