# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

import users.services as UsersService

# Create your views here.
@api_view(["POST"])
def register_user(request):
	response = UsersService.create_user(request.data)

	if response["status"]:
		return Response(
			response,
			status=status.HTTP_201_CREATED)
	else:
		return Response(
			response,
			status=status.HTTP_200_OK)

@api_view(["POST"])
def authenticate_user(request):
	response = UsersService.authenticate_user(request.data)

	return Response(response)

@api_view(["POST"])
def expire_user(request):
	response = UsersService.expire_user(request.data)

	return Response(response)

@api_view(["POST"])
def retrieve_user(request):
	response = UsersService.retrieve_user(request.data)

	return Response(response)