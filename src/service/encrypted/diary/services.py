# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from diary.models import Diary
from authentication.models import Authentication

def required(data, *args): 

	result = True
	for x in args:
		if x not in data:
			result = False
	return result

def strtobool(text):
	return text.lower() in ("true", "yes", "t", "1") 

def sanitize(text):
	return text.replace("<","&lt;").replace(">", "&gt;")

def retrieve_diary_public(data=None):

	diaries = Diary.objects.filter(is_public=True)

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

def retrieve_diary_by_user(data):

	validation = required(data, 'token')
	
	if not validation: 
		return {
				"status": False,
				"error": "Token is required!",
			}

	user = Authentication.objects.get_user_from_token(data["token"])
	if user:
		diaries = Diary.objects.filter(user=user)
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

	validation = required(data, 'token', 'title', 'public', 'text')
	
	if not validation: 
		return {
				"status": False,
				"error": "Token, title, public and text are required!",
			}

	user = Authentication.objects.get_user_from_token(data["token"])
	public = strtobool( data["public"] )

	if user:
		diary = Diary(
			title=sanitize( data["title"] ),
			user=user,
			is_public=public,
			text=sanitize( data["text"] )
			)
		diary.save()

		return {
			"status": True,
			"result": {
				"id": diary.id
			}
		}
	else:
		return { 
			"status": False,
			"error": "Invalid authentication token.",
		}

def delete_diary(data):

	validation = required(data, 'token', 'id')
	
	if not validation: 
		return {
				"status": False,
				"error": "Token and diary id are required!",
			}

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

	validation = required(data, 'token', 'id', 'public')
	
	if not validation: 
		return {
				"status": False,
				"error": "Token, diary id and public are required!",
			}

	user = Authentication.objects.get_user_from_token(data["token"])
	public = strtobool( data["public"] )

	if user:
		diary = Diary.objects.get_diary_from_id_user(data["id"], user)

		if diary:
			diary.is_public = public
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
