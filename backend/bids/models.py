from django.db import models
from django.contrib.auth.models import User

class Licitacao(models.Model):
    titulo = models.CharField(max_length=500)
    codigo_licitacao = models.CharField(max_length=100, unique=True, db_index=True)
    orgao = models.CharField(max_length=300)
    estado = models.CharField(max_length=2)
    cidade = models.CharField(max_length=255)
    data_abertura = models.DateTimeField(db_index=True)
    modalidade = models.CharField(max_length=100)
    objeto = models.TextField()
    link_edital = models.URLField(max_length=1000, blank=True, null=True)
    status = models.CharField(max_length=50, default='Abertta')

    def __str__(self):
        return self.titulo

class Alerta(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    nome_alerta = models.CharField(max_length=100)
    palavras_chave = models.CharField(max_length=500, blank=True, null=True)
    estados = models.CharField(max_length=100, blank=True, null=True)
    modalidades = models.CharField(max_length=255, blank=True, null=True)
    ativo = models.BooleanField(default=True)

    def __str__(self):
        return f"Alerta '{self.nome_alerta}' de {self.usuario.username}"