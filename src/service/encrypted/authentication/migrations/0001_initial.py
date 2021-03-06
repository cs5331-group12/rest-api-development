# -*- coding: utf-8 -*-
# Generated by Django 1.11.10 on 2018-02-25 16:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Authentication',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=36)),
                ('user', models.CharField(max_length=255)),
                ('status', models.BooleanField(default=False)),
            ],
        ),
    ]
