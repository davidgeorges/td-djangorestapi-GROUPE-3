import csv
from django.http import HttpResponse, JsonResponse
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

@api_view(['GET'])
def exportResearchersToCsv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="researchers.csv"'

    researchers = Researcher.objects.all()

    field_names = ['ID', 'Name', 'Specialty']

    writer = csv.writer(response)
    writer.writerow(field_names)

    for researcher in researchers:
        writer.writerow([researcher.id, researcher.name, researcher.specialty])

    return response

@api_view(['GET'])
def exportProjetsToCsv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="projets.csv"'

    projects = ResearchProject.objects.all()

    field_names = ['ID', 'Title', 'Description', 'Start Date', 'Expected End Date', 'Project Leader', 'Researchers']

    writer = csv.writer(response)
    writer.writerow(field_names)

    for project in projects:
        researcher_names = ", ".join([researcher.name for researcher in project.researchers.all()])
        writer.writerow([
            project.id,
            project.title,
            project.description,
            project.start_date,
            project.expected_end_date,
            project.project_leader.name if project.project_leader else "",
            researcher_names
        ])

    return response


@api_view(['GET'])
def exportPublicationsToCsv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="publications.csv"'

    publications = Publication.objects.all()

    field_names = ['ID', 'Title', 'Abstract', 'Associated Project', 'Publication Date']

    writer = csv.writer(response)
    writer.writerow(field_names)

    for publication in publications:
        writer.writerow([
            publication.id,
            publication.title,
            publication.abstract,
            publication.associated_project.title,
            publication.publication_date
        ])

    return response