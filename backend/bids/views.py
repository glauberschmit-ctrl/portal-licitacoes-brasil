from django.db.models import Q
from rest_framework.response import Response # <--- A CORREÇÃO ESTÁ AQUI
from rest_framework import viewsets
from .models import Licitacao
from .serializers import LicitacaoSerializer

class LicitacaoViewSet(viewsets.ViewSet):
    serializer_class = LicitacaoSerializer

    def list(self, request):
        queryset = Licitacao.objects.all().order_by('-data_abertura')
        search_term = self.request.query_params.get('q', None)

        if search_term:
            queryset = queryset.filter(
                Q(titulo__icontains=search_term) |
                Q(objeto__icontains=search_term)
            )
        
        serializer = LicitacaoSerializer(queryset, many=True)
        return Response(serializer.data)