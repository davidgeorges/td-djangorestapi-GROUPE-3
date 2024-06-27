from django.http import JsonResponse
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import viewsets

from .models import Researcher, ResearchProject, Publication
from .serializers import ResearcherSerializer, ResearchProjectSerializer, PublicationSerializer
from .filters import ResearchProjectFilter, PublicationFilter
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import AccessToken
from django.conf import settings
from rest_framework.permissions import AllowAny

class ResearcherViewSet(viewsets.ModelViewSet):
    queryset = Researcher.objects.all()
    serializer_class = ResearcherSerializer
    
    @swagger_auto_schema(
        operation_summary='Liste des chercheurs',
        responses={200: ResearcherSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Créer un nouveau chercheur',
        request_body=ResearcherSerializer,
        responses={201: ResearcherSerializer},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Récupérer les détails d\'un chercheur spécifique',
        responses={200: ResearcherSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Mettre à jour un chercheur spécifique',
        request_body=ResearcherSerializer,
        responses={200: ResearcherSerializer},
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Supprimer un chercheur spécifique',
        responses={204: 'No Content'},
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

class ResearchProjectViewSet(viewsets.ModelViewSet):
    queryset = ResearchProject.objects.all()
    serializer_class = ResearchProjectSerializer
    filterset_class = ResearchProjectFilter
    
    @swagger_auto_schema(
        operation_summary='Liste des projets de recherche',
        responses={200: ResearchProjectSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Créer un nouveau projet de recherche',
        request_body=ResearchProjectSerializer,
        responses={201: ResearchProjectSerializer},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Récupérer les détails d\'un projet de recherche spécifique',
        responses={200: ResearchProjectSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Mettre à jour un projet de recherche spécifique',
        request_body=ResearchProjectSerializer,
        responses={200: ResearchProjectSerializer},
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Supprimer un projet de recherche spécifique',
        responses={204: 'No Content'},
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class PublicationViewSet(viewsets.ModelViewSet):
    queryset = Publication.objects.all()
    serializer_class = PublicationSerializer
    filterset_class = PublicationFilter
    
    @swagger_auto_schema(
        operation_summary='Liste des publications',
        responses={200: PublicationSerializer(many=True)},
    )
    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Créer une nouvelle publication',
        request_body=PublicationSerializer,
        responses={201: PublicationSerializer},
    )
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Récupérer les détails d\'une publication spécifique',
        responses={200: PublicationSerializer},
    )
    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Mettre à jour une publication spécifique',
        request_body=PublicationSerializer,
        responses={200: PublicationSerializer},
    )
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Supprimer une publication spécifique',
        responses={204: 'No Content'},
    )
    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)



class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            response.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=response.data['access'],
            httponly=True,
            secure=settings.DEBUG,
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            samesite='Strict'
        )
        return response

@api_view(['GET'])
@permission_classes([AllowAny])
def get_token(request):
    access_token = AccessToken.for_user(request.user)
    response = JsonResponse({'access': 'Bearer ' + str(access_token)})
    response.set_cookie('access_token', 'Bearer ' + str(access_token), httponly=True)
    return response
