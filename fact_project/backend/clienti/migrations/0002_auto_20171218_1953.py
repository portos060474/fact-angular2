# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2017-12-18 17:53
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clienti', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='activ',
            field=models.CharField(choices=[(b'Yes', b'No'), (b'No', b'No')], default=b'Yes', max_length=3),
        ),
        migrations.AlterField(
            model_name='client',
            name='banca',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='cont',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]