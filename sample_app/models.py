# coding=utf-8
from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
from __future__ import unicode_literals

from django.db import models


########################################################################
class Author(models.Model):
    first_name = models.TextField()
    last_name = models.TextField()
    description = models.TextField()

    ####################################################################
    @property
    def display_name(self):
        return "{} {}".format(self.first_name, self.last_name)


########################################################################
class Book(models.Model):
    BookStatus = (
        ('DRAFT', 'Draft'),
        ('REQUESTED', 'Requested Listing'),
        ('PUBLISHED', 'Published'),
        ('DELISTED', 'Delisted'),
    )
    title = models.TextField()
    author = models.ForeignKey(Author)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    status = models.CharField(max_length=30, choices=BookStatus)
