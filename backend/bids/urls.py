from django.urls import path
from .views import LicitacaoListView

urlpatterns = [
    path('licitacoes/', LicitacaoListView.as_view(), name='lista-licitacoes'),
]