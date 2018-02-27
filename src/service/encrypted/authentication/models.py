# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

import uuid

# Create your models here.
class AuthenticationManager(models.Manager):

	def create_or_get_auth(self, user, token=None):
		auth = None

		if user and token:
			auth = Authentication.objects().filter(user=user, token=token).first()

		if not auth:
			generated = str(uuid.uuid4())
			auth = self.create(token=generated, user=user, status=True)

		return auth;

	def expire_token(self, token):
		result = False

		try:
			auth = Authentication.objects.get(token=token)
			if auth and auth.status:
				# Token exists in DB and valid
				auth.status = False
				auth.save()
				result = True
		except self.model.DoesNotExist:
			# Token does not exist in DB - continue
			pass
			
		return result

	def get_user_from_token(self, token):
		user = None

		try:
			auth = Authentication.objects.get(token=token)
			if auth and auth.status:
				# Token exists in DB and valid
				user = auth.user
		except self.model.DoesNotExist:
			# Token does not exist in DB - continue
			pass

		return user


class Authentication(models.Model):
	token = models.UUIDField(max_length=36, default=uuid.uuid4, editable=False)
	user = models.ForeignKey(User, on_delete=models.CASCADE)
	status = models.BooleanField(default=False)
	
	objects = AuthenticationManager()

	def __str__(self):
		return "{} | {} | {}".format(self.user, self.token, self.status)
