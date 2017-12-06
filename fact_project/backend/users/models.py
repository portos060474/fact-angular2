# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


class Incasari(models.Model):
    id_client = models.IntegerField()
    data_incasare = models.DateField()
    suma = models.DecimalField(max_digits=20, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'incasari'


class Valuta(models.Model):
    data = models.DateField()
    usd = models.DecimalField(db_column='USD', max_digits=10, decimal_places=4)  # Field name made lowercase.
    eur = models.DecimalField(db_column='EUR', max_digits=10, decimal_places=4)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'valuta'
