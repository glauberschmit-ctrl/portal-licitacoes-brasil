from django.db import models

class Licitacao(models.Model):
    # Defina seus campos aqui. Ex:
    titulo = models.CharField(max_length=255)
    data = models.DateField()

    def __str__(self):
        return self.titulo