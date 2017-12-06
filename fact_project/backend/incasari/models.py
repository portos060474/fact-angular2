# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from backend.clienti.models import Client

class Incasari(models.Model):
    id_client = models.ForeignKey(Client)
    data_incasare = models.DateField()
    suma = models.DecimalField(max_digits=20, decimal_places=2)

    class Meta:
        managed = True
        db_table = 'incasari'