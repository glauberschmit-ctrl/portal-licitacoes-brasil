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
    'licitacoes', 
    'bids',
    'rest_framework',
    'django_filters',
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
# D:\portal-licitacoes-brasil\backend\plb_project\settings.py

# ... (Todo o código anterior)

# Configuração para o Heroku e WhiteNoise
# O WhiteNoise é usado para servir arquivos estáticos de forma eficiente
# IMPORTANTE: Descomente (remova a #) APENAS quando for fazer o deploy
if 'DYNO' in os.environ:
    # Use Whitenoise para servir arquivos estáticos em produção
    MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')

    # Configuração para que o Django saiba onde procurar arquivos estáticos
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATIC_URL = '/static/'
    
    # Esta linha é a correção principal do erro 'ImproperlyConfigured':
    # Diz ao Django/WhiteNoise para comprimir os arquivos estáticos para melhor performance.
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    
    # Configuração de segurança (necessária para HTTPS no Heroku)
    SECURE_SSL_REDIRECT = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000 # 1 ano
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    
    REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend']
    }