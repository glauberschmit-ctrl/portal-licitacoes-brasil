from django.urls import path
from django.http import HttpResponse

# Função de teste simples para verificar o roteamento.
# Esta função não usa sua views.py, eliminando qualquer erro lá.
def test_view(request):
    return HttpResponse("ROTA OK", status=200)

urlpatterns = [
    # Tenta mapear a rota 'licitacoes/' para a função de teste.
    path('licitacoes/', test_view, name='test_licitacoes'),
]