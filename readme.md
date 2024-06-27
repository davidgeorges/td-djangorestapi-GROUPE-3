# Application de Suivi de Projets de Recherche

## Introduction

Cette application permet de gérer les informations sur les projets de recherche, les chercheurs, et les publications.

## Installation

### Backend

1. Clonez le dépôt : `git clone https://github.com/davidgeorges/td-djangorestapi-GEORGES-DAVID.git`, puis l'ouvrir
2. Accédez au répertoire du projet : `cd .\backend\project\`
3. Créez un environnement virtuel : `python -m venv env`
4. Activez l'environnement virtuel :
   - Sur Windows : `env\Scripts\activate` ou `.\env\Scripts\activate.bat`
   - Sur MacOS/Linux : `source env/bin/activate`
5. Installez les dépendances : `pip install -r requirements.txt`
6. MODIFIER le .env avec vos informations de base de données, pour ce projet PostgreSQL est utilisé :
   - DATABASE_NAME = "your_database_name"
   - DATABASE_USER = "your_database_user"
   - DATABASE_PASSWORD = "your_database_password"
   - DATABASE_HOST = "your_database_host"
   - DATABASE_PORT = "your_database_port"
7. Appliquez les migrations : `python manage.py migrate`
8. Démarrez le serveur de développement : `python manage.py runserver`


### Frontend

1. Accédez au répertoire `frontend` : `cd .\frontend\my-app\`
2. Installez les dépendances : `npm install`
4. Démarrez l'application React : `npm start`

## Utilisation - Documentation
- SWAGGER:  http://localhost:8000/api/swagger/
- REDOC : http://localhost:8000/api/redoc/


# API Endpoints

## Chercheurs

- `GET /api/chercheurs/` : Récupère la liste de tous les chercheurs.
- `POST /api/chercheurs/` : Crée un nouveau chercheur.
- `GET /api/chercheurs/:id/` : Récupère les détails d'un chercheur spécifique.
  - Exemple : `/api/chercheurs/1/` pour récupérer le chercheur avec l'ID 1.
- `PUT /api/chercheurs/:id/` : Met à jour un chercheur spécifique.
  - Exemple : `/api/chercheurs/1/` pour mettre à jour le chercheur avec l'ID 1.
- `DELETE /api/chercheurs/:id/` : Supprime un chercheur spécifique.
  - Exemple : `/api/chercheurs/1/` pour supprimer le chercheur avec l'ID 1.

## Projets de Recherche

- `GET /api/projets/` : Récupère la liste de tous les projets de recherche.
  - Paramètres optionnels : `?status=ongoing` pour filtrer les projets en cours.
- `POST /api/projets/` : Crée un nouveau projet de recherche.
- `GET /api/projets/:id/` : Récupère les détails d'un projet de recherche spécifique.
  - Exemple : `/api/projets/1/` pour récupérer le projet de recherche avec l'ID 1.
- `PUT /api/projets/:id/` : Met à jour un projet de recherche spécifique.
  - Exemple : `/api/projets/1/` pour mettre à jour le projet de recherche avec l'ID 1.
- `DELETE /api/projets/:id/` : Supprime un projet de recherche spécifique.
  - Exemple : `/api/projets/1/` pour supprimer le projet de recherche avec l'ID 1.

## Publications

- `GET /api/publications/` : Récupère la liste de toutes les publications.
  - Paramètres optionnels : `?year=2023` pour filtrer les publications par année.
- `POST /api/publications/` : Crée une nouvelle publication.
- `GET /api/publications/:id/` : Récupère les détails d'une publication spécifique.
  - Exemple : `/api/publications/1/` pour récupérer la publication avec l'ID 1.
- `PUT /api/publications/:id/` : Met à jour une publication spécifique.
  - Exemple : `/api/publications/1/` pour mettre à jour la publication avec l'ID 1.
- `DELETE /api/publications/:id/` : Supprime une publication spécifique.
  - Exemple : `/api/publications/1/` pour supprimer la publication avec l'ID 1.

## Authentification

- `POST /api/getToken/` : Obtient un token JWT pour l'authentification. (Envoyer les informations d'identification de l'utilisateur)
