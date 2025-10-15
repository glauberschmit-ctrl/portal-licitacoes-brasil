# D:\portal-licitacoes-brasil\backend\licitacoes\urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LicitacaoViewSet  # Importe sua ViewSet da aplicação

# Crie um router
router = DefaultRouter()
# Registre a ViewSet com o nome 'licitacoes'. 
# Isso criará as rotas /licitacoes/, /licitacoes/1/, etc.
router.register(r'licitacoes', LicitacaoViewSet) 

urlpatterns = [
    # Inclua as URLs geradas pelo router. 
    # Como já temos 'api/' no urls.py principal, 
    # a URL final será /api/ + (rotas do router)
    path('', include(router.urls)),
]

# OBS: Se você não estiver usando ViewSets, use o seguinte:
# from .views import LicitacaoListCreateView
# urlpatterns = [
#     path('licitacoes/', LicitacaoListCreateView.as_view(), name='licitacao-list'),
# ]
# MAS O CÓDIGO DO ROUTER É O PADRÃO DRF