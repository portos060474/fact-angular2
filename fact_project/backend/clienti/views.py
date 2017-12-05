from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .models import Client, Contacte
from serializers import ClientiSerializer,ClientiDetailsSerializer

from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST,HTTP_204_NO_CONTENT,HTTP_201_CREATED, HTTP_404_NOT_FOUND

from django.http import Http404

class ClientiDetails(APIView):
    """
    List all Clients, or create a new Client.
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


class ClientiList(APIView):
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