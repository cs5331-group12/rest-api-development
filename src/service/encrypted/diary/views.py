# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from diary.models import Diary

from rest_framework.response import Response
from rest_framework.decorators import api_view

import diary.services as DiarysServices

# Create your views here.
@api_view(["GET", "POST"])
def retrieve_diary(request):
    response = {}

    if request.method == "GET":
        response = DiarysServices.retrieve_diary_public()
    elif request.method == "POST":
        response = DiarysServices.retrieve_diary_by_user(request.data)

    return Response(response)

@api_view(["POST"])
def create_diary(request):
    response = DiarysServices.create_diary(request.data)
    return Response(response)

@api_view(["POST"])
def delete_diary(request):
    response = DiarysServices.delete_diary(request.data)
    return Response(response)

@api_view(["POST"])
def update_diary(request):
    response = DiarysServices.update_diary(request.data)
    return Response(response)
