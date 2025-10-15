# backend/licitacoes/urls.py
from django.urls import path
from .views import LicitacaoViewSet

# Note: as_view({'get': 'list'}) usa a action 'list' da ViewSet
urlpatterns = [
    path('', LicitacaoViewSet.as_view({'get': 'list'}), name='licitacoes-list'),
]