from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ResearcherViewSet, ResearchProjectViewSet, PublicationViewSet, get_token
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Votre API",
        default_version='v1',
        description="Description de votre API",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@exemple.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = DefaultRouter()
router.register(r'chercheurs', ResearcherViewSet)
router.register(r'projets', ResearchProjectViewSet)
router.register(r'publications', PublicationViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('getToken/', get_token, name='get_token'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
