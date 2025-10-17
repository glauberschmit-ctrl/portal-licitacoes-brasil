from django.db import models

class Licitacao(models.Model):
    titulo = models.CharField(max_length=255)
    orgao = models.CharField(max_length=255)
    estado = models.CharField(max_length=2)
    cidade = models.CharField(max_length=100, blank=True, null=True)
    modalidade = models.CharField(max_length=100, blank=True, null=True)

    # A LINHA CORRIGIDA ESTÁ AQUI:
    data_abertura = models.DateTimeField(null=True, blank=True)

    objeto = models.TextField()
    link_edital = models.URLField(max_length=500, blank=True, null=True)
    codigo_licitacao = models.CharField(max_length=100, unique=True)
    status = models.CharField(max_length=50, default='Aberta')

    def __str__(self):
        return self.titulo