from django.conf.urls import url
from django.contrib import admin

from .views import ClientiList,ClientiDetails


urlpatterns = [
	url(r'^$', ClientiList.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', ClientiDetails.as_view(), name='detail'),
]
