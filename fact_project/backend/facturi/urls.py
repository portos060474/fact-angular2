from django.conf.urls import url
from django.contrib import admin

from backend.facturi.views import FacList,FacDetails,FacDetList,FacDetDetails

urlpatterns = [
	url(r'^$', FacList.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', FacDetails.as_view(), name='detail'),
	url(r'^details/$', FacDetList.as_view(), name='list'),
	url(r'^details/(?P<pk>[0-9]+)/$', FacDetDetails.as_view(), name='detail'),
]
