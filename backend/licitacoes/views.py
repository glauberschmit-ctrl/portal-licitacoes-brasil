# Seu LicitacaoViewSet deve estar definido aqui. Exemplo:
from rest_framework import viewsets
from .models import Licitacao
from .serializers import LicitacaoSerializer

class LicitacaoViewSet(viewsets.ModelViewSet):
    queryset = Licitacao.objects.all()
    serializer_class = LicitacaoSerializer