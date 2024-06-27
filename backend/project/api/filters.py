import django_filters
from .models import ResearchProject, Publication

class ResearchProjectFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')
    start_date = django_filters.DateFilter()
    expected_end_date = django_filters.DateFilter()
    project_leader__name = django_filters.CharFilter(field_name='project_leader__name', lookup_expr='icontains')

    class Meta:
        model = ResearchProject
        fields = ['title', 'start_date', 'expected_end_date', 'project_leader__name']

class PublicationFilter(django_filters.FilterSet):
    title = django_filters.CharFilter(lookup_expr='icontains')
    publication_date = django_filters.DateFilter()
    associated_project__title = django_filters.CharFilter(field_name='associated_project__title', lookup_expr='icontains')

    class Meta:
        model = Publication
        fields = ['title', 'publication_date', 'associated_project__title']
