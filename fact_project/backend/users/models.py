# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Users(models.Model):
    user = models.CharField(max_length=255)
    passwd = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    name = models.CharField(max_length=256)
    cnp = models.CharField(max_length=156)

    class Meta:
        managed = True
        db_table = 'users'
