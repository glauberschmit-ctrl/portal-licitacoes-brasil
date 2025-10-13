from rest_framework import generics
from .models import Licitacao
from .serializers import LicitacaoSerializer

class LicitacaoListView(generics.ListAPIView):
    serializer_class = LicitacaoSerializer

    def get_queryset(self):
        queryset = Licitacao.objects.all().order_by('-data_abertura')
        estado = self.request.query_params.get('estado')
        if estado:
            queryset = queryset.filter(estado__iexact=estado)
        modalidade = self.request.query_params.get('modalidade')
        if modalidade:
            queryset = queryset.filter(modalidade__icontains=modalidade)
        keyword = self.request.query_params.get('keyword')
        if keyword:
            queryset = queryset.filter(objeto__icontains=keyword)
        return queryset