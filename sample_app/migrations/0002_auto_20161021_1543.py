# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sample_app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='book',
            name='copyright',
        ),
        migrations.RemoveField(
            model_name='book',
            name='description',
        ),
        migrations.AddField(
            model_name='book',
            name='price',
            field=models.DecimalField(default=0, max_digits=5, decimal_places=2),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='book',
            name='status',
            field=models.CharField(default='DRAFT', max_length=30, choices=[('DRAFT', 'Draft'), ('REQUESTED', 'Requested Listing'), ('PUBLISHED', 'Published'), ('DELISTED', 'Delisted')]),
            preserve_default=False,
        ),
    ]
