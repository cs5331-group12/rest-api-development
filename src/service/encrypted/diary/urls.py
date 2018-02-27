from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.retrieve_diary, name='retrieve_diary'),
    url(r'^create/$', views.create_diary, name='create_diary'),
	url(r'^delete/$', views.delete_diary, name='delete_diary'),
	url(r'^permission/$', views.update_diary, name='update_diary'),
]
