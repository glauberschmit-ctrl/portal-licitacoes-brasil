from rest_framework import serializers
from .models import Licitacao # Importa o model criado acima

class LicitacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licitacao
        fields = '__all__' # Ou liste os campos que você precisa