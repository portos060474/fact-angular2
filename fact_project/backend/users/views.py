"""
    User views.
"""
# # -*- coding: utf-8 -*-
# from __future__ import unicode_literals

from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView, Response

from backend.users.serializers import UserLoginSerializer

# Create your views here.



def index(request):
    """
        Default index page.
    """
    return HttpResponse("Hello World!")


class UserLoginAPIView(APIView):
    """
        User login.
    """
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        """
            User login.
        """
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
