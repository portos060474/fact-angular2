# -*- coding: utf-8 -*-
from django.db import models

class Client(models.Model):
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

class Contact(models.Model):
    id_client = models.ForeignKey(Client,default=999)
    nume = models.CharField(max_length=256)
    email = models.CharField(max_length=256)
    telefon = models.CharField(max_length=256)
    pozitie = models.CharField(max_length=256)

    class Meta:
        managed = True
        db_table = 'contacte'

    def __unicode__(self):
        return self.nume
