# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_201_CREATED

from backend.facturi.models import Fac,FacDet
from backend.facturi.serializers import FacSerializer,FacDetSerializer

from django.http import Http404


class FacList(APIView):
    """
    List all Facturs.
    """
    def get(self, request, format=None):
        facturi = Fac.objects.all()
        serializer = FacSerializer(facturi, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FacSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class FacDetails(APIView):
    """
    List, update or delete Factur details.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Fac.objects.get(pk=pk)
        except Fac.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        facturi = self.get_object(pk)
        serializer = FacSerializer(facturi)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        facturi = self.get_object(pk)
        serializer = FacSerializer(facturi, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        facturi = self.get_object(pk)
        facturi.delete()
        return Response(status=HTTP_204_NO_CONTENT)





class FacDetList(APIView):
    """
    List all Facturs.
    """
    def get(self, request, format=None):
        facturi_det = FacDet.objects.all()
        serializer = FacDetSerializer(facturi_det, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FacDetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class FacDetDetails(APIView):
    """
    List, update or delete Factur details.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return FacDet.objects.get(pk=pk)
        except FacDet.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        facturi_det = self.get_object(pk)
        serializer = FacDetSerializer(facturi_det)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        facturi_det = self.get_object(pk)
        serializer = FacDetSerializer(facturi_det, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        facturi_det = self.get_object(pk)
        facturi_det.delete()
        return Response(status=HTTP_204_NO_CONTENT)

