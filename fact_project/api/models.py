# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey has `on_delete` set to the desired behavior.
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from __future__ import unicode_literals

from django.db import models


class Clienti(models.Model):
    nume = models.CharField(max_length=256)
    j = models.CharField(max_length=256)
    cui = models.CharField(max_length=256)
    adresa = models.CharField(max_length=256)
    cont = models.CharField(max_length=256)
    banca = models.CharField(max_length=256)
    email = models.CharField(max_length=255)
    activ = models.CharField(max_length=3, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'clienti'

    def __unicode__(self):
        return self.nume

class Contacte(models.Model):
    id_client = models.ForeignKey(Clienti, )
    nume = models.CharField(max_length=256)
    email = models.CharField(max_length=256)
    telefon = models.CharField(max_length=256)
    pozitie = models.CharField(max_length=256)

    class Meta:
        managed = True
        db_table = 'contacte'

    def __unicode__(self):
        return self.nume


class Fac(models.Model):
    id_client = models.IntegerField()
    data_fac = models.DateField()
    data_scad = models.DateField()
    status = models.CharField(max_length=7)
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
    id_fac = models.ForeignKey(Fac)
    denumire = models.CharField(max_length=256)
    um = models.CharField(max_length=256)
    cant = models.DecimalField(max_digits=10, decimal_places=2)
    pu = models.DecimalField(max_digits=10, decimal_places=2)
    pu_valuta = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = True
        db_table = 'fac_det'


class Incasari(models.Model):
    id_client = models.IntegerField()
    data_incasare = models.DateField()
    suma = models.DecimalField(max_digits=20, decimal_places=2)

    class Meta:
        managed = True
        db_table = 'incasari'


class Valuta(models.Model):
    data = models.DateField()
    usd = models.DecimalField(db_column='USD', max_digits=10, decimal_places=4)  # Field name made lowercase.
    eur = models.DecimalField(db_column='EUR', max_digits=10, decimal_places=4)  # Field name made lowercase.

    class Meta:
        managed = True
        db_table = 'valuta'
