# backend/bids/views.py

from rest_framework import viewsets
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Licitacao
from .serializers import LicitacaoSerializer

class LicitacaoViewSet(viewsets.ReadOnlyModelViewSet):
    # A consulta base
    queryset = Licitacao.objects.all()
    serializer_class = LicitacaoSerializer
    
    # Adicionamos ambos os filtros
    filter_backends = [DjangoFilterBackend, filters.SearchFilter] 
    
    # 1. Filtro por campos exatos (DjangoFilterBackend)
    # ESSENCIAL: Adicionamos 'cidade' aqui
    filterset_fields = ['estado', 'modalidade', 'cidade'] 
    
    # 2. Busca por texto livre (SearchFilter, usa o parâmetro 'search')
    search_fields = ['titulo', 'orgao', 'objeto', 'cidade']
