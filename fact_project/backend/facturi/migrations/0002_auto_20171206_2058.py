# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-06 20:58
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('facturi', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='fac',
            options={'managed': False},
        ),
        migrations.AlterModelOptions(
            name='facdet',
            options={'managed': False},
        ),
    ]
