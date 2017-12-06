from rest_framework.serializers import ModelSerializer
 
from backend.clienti.models import Client, Contact


# Clienti
# ------------------------------------------------------------------------

class ClientiSerializer(ModelSerializer):
	"""
	Create Clients serializer.

	"""

	class Meta:
		model = Client
		fields = '__all__'


class ContactsSerializer(ModelSerializer):
	"""
	Create Contacts serializer.

	"""

	class Meta:
		model = Contact
		fields = '__all__'

