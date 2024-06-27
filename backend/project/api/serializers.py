from rest_framework import serializers
from .models import Researcher, ResearchProject, Publication

class ResearcherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Researcher
        fields = '__all__'

class ResearchProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchProject
        fields = '__all__'

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'
