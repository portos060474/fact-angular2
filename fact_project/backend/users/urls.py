from django.conf.urls import url,include
from rest_framework.authtoken import views as drf_views
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token


from .views import UserLoginAPIView

from backend.clienti import urls

urlpatterns = [
    url(r'^auth$', drf_views.obtain_auth_token, name='auth'),
    url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    url(r'^api-token-auth/', obtain_jwt_token),
    url(r'^api-token-refresh/', refresh_jwt_token),

    
]