from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^heartbeat/$', views.heartbeat, name='heartbeat'),
    url(r'^members/$', views.members, name='members'),
]