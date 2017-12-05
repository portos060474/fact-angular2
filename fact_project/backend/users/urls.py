from django.conf.urls import url,include
from rest_framework.authtoken import views as drf_views
from . import views
from .views import UserLoginAPIView
from backend.clienti import urls

urlpatterns = [
    url(r'^auth$', drf_views.obtain_auth_token, name='auth'),
    url(r'^login$', UserLoginAPIView.as_view(), name='login'),
    url(r'^api/clienti/', include("backend.clienti.urls", namespace='clienti-api')),
    url(r'', views.index, name='index'),
]