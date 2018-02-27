# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.db.models.signals import pre_save

from django.utils import timezone
from django.contrib.auth.models import User
from django.conf import settings


# Create your models here.
class DiaryManager(models.Manager):

	def get_diary_from_id_user(self, id, user):
		try:
			diary = Diary.objects.get(id=id, user=user)
			if diary:
				return diary
		except self.model.DoesNotExist:
			return None


class Diary(models.Model):
	title = models.CharField(max_length=255)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, default=0)
	published_date = models.DateTimeField()
	is_public = models.BooleanField(default=False)
	text = models.CharField(max_length=1000)

	objects = DiaryManager()

	def __str__(self):
		return "{} | {} | {}".format(self.title, self.is_public, self.text)

def pre_save_post_receiver(sender, instance, *args, **kwargs):
    if not instance.published_date:
        instance.published_date = timezone.datetime.now()

def create_diary(data):
	data = data

pre_save.connect(pre_save_post_receiver, sender=Diary)