from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.retrieve_user, name='retrieve_user'),
	url(r'^register/$', views.register_user, name='register_user'),
    url(r'^authenticate/$', views.authenticate_user, name='authenticate_user'),
    url(r'^expire/$', views.expire_user, name='expire_user'),
]