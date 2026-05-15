# Tour Arcade - Deployment Guide

## Overview
This guide provides comprehensive instructions for deploying Tour Arcade gaming platform with a Django backend and React frontend.

---

## Architecture

### Frontend
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (Framer Motion)
- **Build Tool**: Vite
- **State Management**: React Hooks + Local Storage

### Backend (Recommended)
- **Framework**: Django 4.2+
- **Database**: PostgreSQL 14+
- **API**: Django REST Framework
- **Authentication**: JWT (djangorestframework-simplejwt)
- **Real-time**: Django Channels (optional for live features)

---

## Prerequisites

### Development Environment
```bash
# Node.js 18+ and npm/yarn
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher

# Python 3.11+ and pip
python --version  # Should be 3.11 or higher
pip --version
```

---

## Backend Setup (Django)

### 1. Project Structure
```
tour-arcade-backend/
├── manage.py
├── requirements.txt
├── .env
├── tour_arcade/          # Main project folder
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── api/                  # API app
│   ├── __init__.py
│   ├── models.py         # Database models
│   ├── serializers.py    # DRF serializers
│   ├── views.py          # API views
│   ├── urls.py
│   └── permissions.py
├── games/                # Games app
│   ├── __init__.py
│   ├── models.py
│   ├── views.py
│   └── game_logic.py
├── tournaments/          # Tournaments app
│   ├── __init__.py
│   ├── models.py
│   ├── views.py
│   └── bracket_logic.py
└── users/                # Users app
    ├── __init__.py
    ├── models.py
    ├── views.py
    └── serializers.py
```

### 2. Install Dependencies
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install packages
pip install django==4.2
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers
pip install psycopg2-binary  # PostgreSQL adapter
pip install python-decouple  # Environment variables
pip install pillow  # Image processing
pip install django-filter
pip install drf-yasg  # API documentation

# Save requirements
pip freeze > requirements.txt
```

### 3. Django Project Setup
```bash
# Create Django project
django-admin startproject tour_arcade .

# Create apps
python manage.py startapp api
python manage.py startapp users
python manage.py startapp games
python manage.py startapp tournaments
```

### 4. settings.py Configuration
```python
# tour_arcade/settings.py
import os
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='your-secret-key-here')
DEBUG = config('DEBUG', default=False, cast=bool)
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third party
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'django_filters',
    'drf_yasg',
    
    # Local apps
    'api',
    'users',
    'games',
    'tournaments',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS Settings
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:5173",
]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default='tour_arcade'),
        'USER': config('DB_USER', default='postgres'),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

# REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
}

# JWT Settings
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Custom user model (optional but recommended)
AUTH_USER_MODEL = 'users.User'
```

### 5. Database Models

**users/models.py:**
```python
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    TIER_CHOICES = [
        ('free', 'Free'),
        ('standard', 'Standard'),
        ('premium', 'Premium'),
    ]
    
    tier = models.CharField(max_length=10, choices=TIER_CHOICES, default='free')
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    total_points = models.IntegerField(default=0)
    games_played = models.IntegerField(default=0)
    tournaments_won = models.IntegerField(default=0)
    region = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username
```

**games/models.py:**
```python
from django.db import models
from users.models import User

class Game(models.Model):
    CATEGORY_CHOICES = [
        ('racing', 'Racing'),
        ('fighting', 'Fighting'),
        ('shooter', 'Shooter'),
        ('sports', 'Sports'),
        ('strategy', 'Strategy'),
        ('puzzle', 'Puzzle'),
        ('arcade', 'Arcade'),
    ]
    
    id = models.CharField(max_length=50, primary_key=True)
    title = models.CharField(max_length=100)
    display_name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    description = models.TextField()
    image = models.URLField()
    emoji = models.CharField(max_length=10)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    players_count = models.CharField(max_length=20, default='0')
    featured = models.BooleanField(default=False)
    difficulty_easy_multiplier = models.DecimalField(max_digits=3, decimal_places=1, default=1.0)
    difficulty_medium_multiplier = models.DecimalField(max_digits=3, decimal_places=1, default=1.5)
    difficulty_hard_multiplier = models.DecimalField(max_digits=3, decimal_places=1, default=2.0)
    has_launcher = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.display_name

class GameScore(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='scores')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='scores')
    score = models.IntegerField()
    leaderboard_points = models.IntegerField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES)
    played_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-leaderboard_points', '-played_at']
        indexes = [
            models.Index(fields=['game', '-leaderboard_points']),
            models.Index(fields=['user', '-played_at']),
        ]

    def __str__(self):
        return f"{self.user.username} - {self.game.title}: {self.score}"
```

**tournaments/models.py:**
```python
from django.db import models
from users.models import User
from games.models import Game

class Tournament(models.Model):
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    game = models.ForeignKey(Game, on_delete=models.CASCADE, related_name='tournaments')
    prize_pool = models.DecimalField(max_digits=10, decimal_places=2)
    entry_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    max_participants = models.IntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='created_tournaments')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class TournamentParticipant(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='participants')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tournament_participations')
    rank = models.IntegerField(null=True, blank=True)
    score = models.IntegerField(default=0)
    joined_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['tournament', 'user']
        ordering = ['rank', '-score']

    def __str__(self):
        return f"{self.user.username} in {self.tournament.title}"
```

### 6. API Serializers

**games/serializers.py:**
```python
from rest_framework import serializers
from .models import Game, GameScore

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = '__all__'

class GameScoreSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.username', read_only=True)
    game_title = serializers.CharField(source='game.display_name', read_only=True)
    
    class Meta:
        model = GameScore
        fields = ['id', 'user', 'user_name', 'game', 'game_title', 'score', 
                  'leaderboard_points', 'difficulty', 'played_at']
        read_only_fields = ['id', 'played_at']
```

### 7. API Views

**games/views.py:**
```python
from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Game, GameScore
from .serializers import GameSerializer, GameScoreSerializer

class GameViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Game.objects.filter(is_active=True)
    serializer_class = GameSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category', 'featured']
    search_fields = ['title', 'display_name', 'description']
    ordering_fields = ['rating', 'created_at']
    
    @action(detail=True, methods=['get'])
    def leaderboard(self, request, pk=None):
        game = self.get_object()
        scores = GameScore.objects.filter(game=game)[:100]
        serializer = GameScoreSerializer(scores, many=True)
        return Response(serializer.data)

class GameScoreViewSet(viewsets.ModelViewSet):
    queryset = GameScore.objects.all()
    serializer_class = GameScoreSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['game', 'user', 'difficulty']
    ordering_fields = ['score', 'leaderboard_points', 'played_at']
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
```

### 8. URL Configuration

**api/urls.py:**
```python
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from games.views import GameViewSet, GameScoreViewSet

router = DefaultRouter()
router.register(r'games', GameViewSet)
router.register(r'scores', GameScoreViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
```

**tour_arcade/urls.py:**
```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Tour Arcade API",
        default_version='v1',
        description="Tour Arcade Gaming Platform API",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### 9. Environment Variables

Create `.env` file:
```env
# Django
SECRET_KEY=your-super-secret-key-change-this
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database
DB_NAME=tour_arcade
DB_USER=postgres
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 10. Database Migrations
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load initial game data (optional)
python manage.py loaddata initial_games.json
```

### 11. Run Development Server
```bash
python manage.py runserver 8000
```

---

## Frontend Setup

### 1. Environment Configuration

Create `.env.local`:
```env
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000
```

### 2. Update API Service

Create `src/services/api.ts`:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = {
  async get(endpoint: string) {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },
  
  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },
};

// Usage example:
// const games = await apiClient.get('/games/');
// const score = await apiClient.post('/scores/', { game: 'segarally', score: 1000 });
```

### 3. Build Frontend
```bash
npm install
npm run build
```

---

## Production Deployment

### Option 1: Deploy on VPS (Ubuntu)

#### 1. Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install dependencies
sudo apt install python3.11 python3-pip python3-venv nginx postgresql redis-server -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs -y
```

#### 2. PostgreSQL Setup
```bash
sudo -u postgres psql

CREATE DATABASE tour_arcade;
CREATE USER tour_arcade_user WITH PASSWORD 'strong_password_here';
ALTER ROLE tour_arcade_user SET client_encoding TO 'utf8';
ALTER ROLE tour_arcade_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE tour_arcade_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE tour_arcade TO tour_arcade_user;
\q
```

#### 3. Deploy Backend
```bash
# Clone repository
cd /var/www/
git clone your-repo-url tour-arcade
cd tour-arcade/backend

# Setup virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install gunicorn

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate
```

#### 4. Gunicorn Setup

Create `/etc/systemd/system/tourarcade.service`:
```ini
[Unit]
Description=Tour Arcade Gunicorn daemon
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/var/www/tour-arcade/backend
ExecStart=/var/www/tour-arcade/backend/venv/bin/gunicorn \
          --workers 3 \
          --bind unix:/var/www/tour-arcade/backend/tourarcade.sock \
          tour_arcade.wsgi:application

[Install]
WantedBy=multi-user.target
```

```bash
sudo systemctl start tourarcade
sudo systemctl enable tourarcade
```

#### 5. Nginx Configuration

Create `/etc/nginx/sites-available/tourarcade`:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /var/www/tour-arcade/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API
    location /api/ {
        proxy_pass http://unix:/var/www/tour-arcade/backend/tourarcade.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Admin
    location /admin/ {
        proxy_pass http://unix:/var/www/tour-arcade/backend/tourarcade.sock;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Static files
    location /static/ {
        alias /var/www/tour-arcade/backend/staticfiles/;
    }

    # Media files
    location /media/ {
        alias /var/www/tour-arcade/backend/media/;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/tourarcade /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### 6. SSL Certificate (Let's Encrypt)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

### Option 2: Deploy on Cloud (AWS/DigitalOcean/Heroku)

Refer to platform-specific guides for Django + React deployment.

---

## Environment-Specific Settings

### Production settings.py
```python
# Security
DEBUG = False
SECRET_KEY = config('SECRET_KEY')
ALLOWED_HOSTS = config('ALLOWED_HOSTS').split(',')

# Database - Use production credentials
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}

# Security Headers
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
```

---

## Testing

### Backend Tests
```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test games

# With coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```

### Frontend Tests
```bash
npm run test
```

---

## Monitoring & Logging

### Django Logging
```python
# settings.py
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': '/var/log/tourarcade/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': True,
        },
    },
}
```

---

## Backup Strategy

### Database Backup
```bash
# Create backup
pg_dump tour_arcade > backup_$(date +%Y%m%d).sql

# Restore backup
psql tour_arcade < backup_20260411.sql
```

### Automated Backups (Cron)
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * pg_dump tour_arcade > /backups/tour_arcade_$(date +\%Y\%m\%d).sql
```

---

## Performance Optimization

### Django
- Enable caching (Redis/Memcached)
- Use database indexing
- Optimize queries (select_related, prefetch_related)
- Use CDN for static files

### Frontend
- Enable gzip compression
- Minimize bundle size
- Lazy load components
- Use image optimization

---

## Troubleshooting

### Common Issues

1. **CORS Errors**: Check CORS_ALLOWED_ORIGINS in settings.py
2. **Static Files Not Loading**: Run `python manage.py collectstatic`
3. **Database Connection**: Verify .env credentials
4. **502 Bad Gateway**: Check Gunicorn service status

---

## Support & Documentation

- Django Docs: https://docs.djangoproject.com/
- Django REST Framework: https://www.django-rest-framework.org/
- React Docs: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/

---

## Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Use strong database passwords
- [ ] Enable HTTPS in production
- [ ] Set DEBUG=False in production
- [ ] Configure ALLOWED_HOSTS properly
- [ ] Enable CSRF protection
- [ ] Implement rate limiting
- [ ] Regular security updates
- [ ] Database backups configured
- [ ] Environment variables secured

---

## License & Legal

Ensure compliance with:
- Game licensing agreements
- Payment processing regulations
- Data privacy laws (GDPR, CCPA)
- Terms of service
- Age restrictions

---

**Last Updated**: April 11, 2026
**Version**: 1.0.0
