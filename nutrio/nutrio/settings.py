from logging import config
import os
from pathlib import Path
from datetime import timedelta
# --- NEW IMPORTS FOR DATABASE AND ENV LOADING ---
import dj_database_url
from dotenv import load_dotenv
# --- Load environment variables from local.env file ---
load_dotenv(Path(__file__).resolve().parent.parent / 'local.env')
# ----------------------------------------------------

# --- SECRETS LOADED VIA os.getenv() ---
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY') # Loaded from local.env or system environment


#from decouple import config # type: ignore

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# --- UPDATED: Load SECRET_KEY from local.env or use fallback ---
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-pu!yemnzv&f#g=krjk!3h)(qe$g0^2oi)1=)9#q)&mboqvyy8v')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# --- UPDATED: Set ALLOWED_HOSTS for easier Railway deployment ---
ALLOWED_HOSTS = ['*'] 
SITE_ID = 2

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'api',
    'openapi',
    'athlete',
    'athleteauth',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',


]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    #"allauth.account.middleware.AccountMiddleware",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
CSRF_TRUSTED_ORIGINS = [
    "http://localhost:5173",
]

CORS_ALLOW_CREDENTIALS = True

# Use secure settings only in production
CSRF_COOKIE_SAMESITE = None
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'AUTH_HEADER_TYPES': ('Bearer',),
}

ROOT_URLCONF = 'nutrio.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'nutrio.wsgi.application'


# ----------------------------------------------------------------------
# DATABASE CONFIGURATION (Updated for Railway PostgreSQL)
# ----------------------------------------------------------------------
# Fallback to SQLite by default if no DATABASE_URL is set (e.g., local testing)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3', 
    }
}

# Overwrite the default database if DATABASE_URL environment variable is found
if 'DATABASE_URL' in os.environ:
    DATABASES['default'] = dj_database_url.config(
        conn_max_age=600,
        conn_health_check=True,
        ssl_require=True # CRUCIAL: Required for connecting to Railway's cloud Postgres
    )
# ----------------------------------------------------------------------
# END DATABASE CONFIGURATION
# ----------------------------------------------------------------------


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]
# CORS settings
CORS_ALLOW_ALL_ORIGINS = True # ✅ Open for development

# REST Framework settings
REST_FRAMEWORK = {
     'DEFAULT_AUTHENTICATION_CLASSES': (
    'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
    'rest_framework.permissions.AllowAny'
    ]
}

# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# OAuth Settings
SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'APP': {
        #   'client_id': env('OAUTH_GOOGLE_CLIENT_ID'),
          # 'secret': env('OAUTH_GOOGLE_SECRET'),
        },
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {
            'access_type': 'online',
            'prompt': 'consent',
        },
    },
}

SITE_ID = 1 # or 2, depending on your admin setup

LOGIN_REDIRECT_URL = '/' # or your frontend path
ACCOUNT_EMAIL_VERIFICATION = "none"
SOCIALACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True

ACCOUNT_UNIQUE_EMAIL = True
SOCIALACCOUNT_AUTO_SIGNUP = True
SOCIALACCOUNT_LOGIN_ON_GET = True
SOCIALACCOUNT_EMAIL_VERIFICATION = "none"
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
# --- UPDATED: Get from local.env or environment ---
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER', 'karanibriantimothy@gmail.com')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD', 'your_app_password')
# --------------------------------------------------
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False

DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
