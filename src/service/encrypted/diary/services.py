# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from diary.models import Diary
from authentication.models import Authentication

def retrieve_diary(data=None):
	diaries = None

	if not data:
		diaries = Diary.objects.filter(is_public=True)
	else:
		user = Authentication.objects.get_user_from_token(data["token"])

		if user:
			diaries = Diary.objects.filter(user=user)

	if diaries:
		return {
			"status": True,
			"result": [{
				"id": diary.id,
				"title": diary.title,
				"author": diary.user.username,
				"publish_date": diary.published_date,
				"public": diary.is_public,
				"text": diary.text
			} for diary in diaries],
		}
	else:
		return {
			"status": False,
			"error": "Invalid authentication token.",
		}

def create_diary(data):
	user = Authentication.objects.get_user_from_token(data["token"])

	if user:
		diary = Diary(
			title=data["title"],
			user=user,
			is_public=data["public"],
			text=data["text"]
			)
		diary.save()

		return {
			"status": True,
			"id": diary.id,
		}
	else:
		return { 
			"status": False,
			"error": "Invalid authentication token.",
		}

def delete_diary(data):
	user = Authentication.objects.get_user_from_token(data["token"])

	if user:
		diary = Diary.objects.get_diary_from_id_user(data["id"], user)

		if diary:
			diary.delete()

			return {
				"status": True,
			}
		else:
			return {
				"status": False,
				"error": "Diary record not found.",
			}
	else:
		return {
			"status": False,
			"error": "Invalid authentication token."
		}

def update_diary(data):
	user = Authentication.objects.get_user_from_token(data["token"])

	if user:
		diary = Diary.objects.get_diary_from_id_user(data["id"], user)

		if diary:
			diary.is_public = data["public"]
			diary.save()

			return {
				"status": True,
			}
		else:
			return {
				"status": False,
				"error": "Diary record not found.",
			}
	else:
		return {
			"status": False,
			"error": "Invalid authentication token."
		}
