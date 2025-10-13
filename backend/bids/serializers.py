from rest_framework import serializers
from .models import Licitacao

class LicitacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licitacao
        fields = '__all__'