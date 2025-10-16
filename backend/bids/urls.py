from django.urls import path
from .views import LicitacaoViewSet

# Usamos o ViewSet para criar as rotas automaticamente
# A rota para listar e criar é /api/licitacoes/
urlpatterns = [
    path('licitacoes/', LicitacaoViewSet.as_view({'get': 'list'}), name='licitacao-list'),
]