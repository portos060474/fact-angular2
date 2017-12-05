from rest_framework.serializers import ModelSerializer
 
from models import Client,Contacte



# Clienti
# ------------------------------------------------------------------------

class ClientiSerializer(ModelSerializer):
	"""
	Create Clients available.

	"""

	class Meta:
		model = Client
		fields = '__all__'


class ClientiDetailsSerializer(ModelSerializer):
	"""
	Create Clients available.

	"""

	class Meta:
		model = Client
		fields = '__all__'

