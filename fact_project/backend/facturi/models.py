# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from backend.clienti.models import Client

class Fac(models.Model):
    STATUSES = (
        ('achitat', 'Factura achitata'),
        ('anulat', 'Factura anulata'),
        ('stornat','Factura stornata'),
    )

    id_client = models.ForeignKey(Client,default=999)
    data_fac = models.DateField()
    data_scad = models.DateField()
    status = models.CharField(max_length=7,choices=STATUSES,default='')
    emailat = models.CharField(max_length=3)
    id_valuta = models.CharField(max_length=255)
    id_user = models.IntegerField()
    comentarii = models.CharField(max_length=256)
    ctva = models.FloatField()
    externa = models.CharField(max_length=3)

    class Meta:
        managed = True
        db_table = 'fac'


class FacDet(models.Model):
    id_fac = models.ForeignKey(Fac,default=999)
    denumire = models.CharField(max_length=256)
    um = models.CharField(max_length=256)
    cant = models.DecimalField(max_digits=10, decimal_places=2)
    pu = models.DecimalField(max_digits=10, decimal_places=2)
    pu_valuta = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = True
        db_table = 'fac_det'

