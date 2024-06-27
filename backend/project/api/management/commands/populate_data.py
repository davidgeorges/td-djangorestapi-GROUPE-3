from django.core.management.base import BaseCommand
from api.models import Researcher, ResearchProject, Publication
from faker import Faker
import random
from datetime import timedelta
from django.utils import timezone

class Command(BaseCommand):
    help = 'Populate the database with random data'

    def handle(self, *args, **kwargs):
        fake = Faker()

        # Clear existing data
        Researcher.objects.all().delete()
        ResearchProject.objects.all().delete()
        Publication.objects.all().delete()

        # Create researchers
        researchers = []
        for _ in range(10):
            researcher = Researcher(
                name=fake.name(),
                specialty=fake.job()
            )
            researcher.save()
            researchers.append(researcher)

        # Create research projects
        projects = []
        for _ in range(10):
            project_leader = random.choice(researchers)
            project = ResearchProject(
                title=fake.catch_phrase(),
                description=fake.text(),
                start_date=fake.date_this_decade(before_today=True, after_today=False),
                expected_end_date=fake.date_this_decade(before_today=False, after_today=True),
                project_leader=project_leader
            )
            project.save()
            project.researchers.set(random.sample(researchers, random.randint(1, 5)))
            projects.append(project)

        # Create publications
        for _ in range(20):
            publication = Publication(
                title=fake.catch_phrase(),
                abstract=fake.text(),
                associated_project=random.choice(projects),
                publication_date=fake.date_this_decade(before_today=True, after_today=False)
            )
            publication.save()

        self.stdout.write(self.style.SUCCESS('Successfully populated the database with random data'))
