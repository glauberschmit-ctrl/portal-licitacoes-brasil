from rest_framework import viewsets
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Licitacao
from .serializers import LicitacaoSerializer

class LicitacaoViewSet(viewsets.ModelViewSet):
    """
    API endpoint que permite que licitações sejam visualizadas ou editadas.
    O ModelViewSet já cria rotas para LIST (GET /api/licitacoes/) e DETAIL (GET /api/licitacoes/{id}/).
    """
    queryset = Licitacao.objects.all().order_by('-data_abertura')
    serializer_class = LicitacaoSerializer
    
    # Filtros para busca
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    
    # Campos que podem ser filtrados via query params (e.g., ?estado=SC&cidade=XAXIM)
    filterset_fields = ['estado', 'cidade', 'modalidade'] 
    
    # Campos que o SearchFilter vai procurar (e.g., ?search=consultoria)
    search_fields = ['titulo', 'objeto', 'orgao'] 
