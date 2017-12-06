from django.conf.urls import url
from django.contrib import admin

from .views import ClientList,ClientDetails,ContactsList,ContactDetails


urlpatterns = [
	url(r'^$', ClientList.as_view(), name='list'),
	url(r'^(?P<pk>[0-9]+)/$', ClientDetails.as_view(), name='detail'),
	url(r'^contacts/$', ContactsList.as_view(), name='list'),
	url(r'^contacts/(?P<pk>[0-9]+)/$', ContactDetails.as_view(), name='detail'),
]
