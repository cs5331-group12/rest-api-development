# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib.auth import authenticate
from django.contrib.auth.models import User

from authentication.models import Authentication

def create_user(data):
	try:
		user = User.objects.get(username=data["username"])

		if user:
			# User exists in DB
			return {
				"status": False,
				"error": "User already exists!",
			}
	except User.DoesNotExist:
		# User does not exist in DB - create new User
		user = User.objects.create_user(
			username=data["username"],
			password=data["password"]
			)
		user.profile.fullname=data["fullname"]
		user.profile.age=data["age"]
		user.save()

		return {
			"status": True,
		}

def authenticate_user(data):
	user = authenticate(username=data["username"], password=data["password"])

	if user:
		auth = Authentication.objects.create_or_get_auth(user)
		return {
			"status": True,
			"token": auth.token,
		}
	else:
		return {
			"status": False,
		}

def expire_user(data):
	status = Authentication.objects.expire_token(data["token"])

	return {
		"status": status,
	}

def retrieve_user(data):
	user = Authentication.objects.get_user_from_token(data["token"])
	
	if user:
		return {
			"status": True,
			"username": user.username,
			"fullname": user.profile.fullname,
			"age": user.profile.age,
		}
	else:
		return {
			"status": False,
			"error": "Invalid authentication token",
		}
