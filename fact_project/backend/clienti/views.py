# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_201_CREATED

from backend.clienti.models import Client, Contact
from backend.clienti.serializers import ClientiSerializer,ContactsSerializer

from django.http import Http404


class ClientList(APIView):
    """
    List all Clients.
    """
    def get(self, request, format=None):
        clienti = Client.objects.all()
        serializer = ClientiSerializer(clienti, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ClientiSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ClientDetails(APIView):
    """
    List, update or delete Client details.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Client.objects.get(pk=pk)
        except Client.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        clienti = self.get_object(pk)
        serializer = ClientiSerializer(clienti)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        clienti = self.get_object(pk)
        serializer = ClientiSerializer(clienti, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        clienti = self.get_object(pk)
        clienti.delete()
        return Response(status=HTTP_204_NO_CONTENT)




class ContactsList(APIView):
    """
    List all Contacts.
    """
    def get(self, request, format=None):
        contacts = Contact.objects.all()
        serializer = ContactsSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ContactsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class ContactDetails(APIView):
    """
    List, update or delete Contact details.
    """

    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Contact.objects.get(pk=pk)
        except Contact.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        contacts = self.get_object(pk)
        serializer = ContactsSerializer(contacts)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        contacts = self.get_object(pk)
        serializer = ContactsSerializer(contacts, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        contacts = self.get_object(pk)
        contacts.delete()
        return Response(status=HTTP_204_NO_CONTENT)
