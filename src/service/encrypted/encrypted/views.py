# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(["GET"])
def root(request):
	"""
	Retrieve all endpoints that are implemented
	"""

	data = {
		"status": True,
		"result": [
			"/",
			"/meta/heartbeat",
			"/meta/members",
			"/users/",
			"/users/register",
			"/users/authenticate",
			"/users/expire",
			"/diary/",
			"/diary/create",
			"/diary/delete",
			"/diary/permission",
		]
	}
	return Response(data)
	