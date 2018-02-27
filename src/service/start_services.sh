#!/bin/bash

apachectl start
python /service/encrypted/manage.py makemigrations
python /service/encrypted/manage.py migrate
python /service/encrypted/manage.py runserver 0.0.0.0:8080
