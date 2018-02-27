# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth.models import User

# Create your views here.
@api_view(["GET"])
def heartbeat(request):
	"""
	Heartbeat Test
	"""

	data = {
		"status": True,
	}
	return Response(data)

@api_view(["GET"])
def members(request):
	data = {
		"status": True,
		"result": [
			"Chua Si Hao",
			"Hoo De Lin",
			"Low Wei Kit",
			"Ye Kyaw Swa Aung Joshua",
		]
	}
	return Response(data)