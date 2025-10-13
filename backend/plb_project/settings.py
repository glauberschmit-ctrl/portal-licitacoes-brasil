import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent 



SECRET_KEY = 'sua-chave-secreta-aqui' 
DEBUG = True
ALLOWED_HOSTS = []
ROOT_URLCONF = 'plb_project.urls' 
WSGI_APPLICATION = 'plb_project.wsgi.application'



INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'bids',
    'rest_framework',
    'corsheaders',
]



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware', 
    'django.middleware.clickjacking.XFrameOptionsMiddleware'
]



TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates', 
        'DIRS': [],
        'APP_DIRS': True, 
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',     
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3', 
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}



CORS_ALLOW_ALL_ORIGINS = True

LANGUAGE_CODE = 'pt-br' 
TIME_ZONE = 'America/Sao_Paulo'
USE_I18N = True
USE_TZ = True

STATIC_URL = 'static/'
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'