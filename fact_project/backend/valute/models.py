# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Valuta(models.Model):
    data = models.DateField()
    usd = models.DecimalField(db_column='USD', max_digits=10, decimal_places=4)  # Field name made lowercase.
    eur = models.DecimalField(db_column='EUR', max_digits=10, decimal_places=4)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'valuta'
