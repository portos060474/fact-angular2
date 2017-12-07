from rest_framework.serializers import ModelSerializer
 
from backend.valute.models import Valuta

class ValutaSerializer(ModelSerializer):
	"""
	Create Valuta serializer.

	"""

	class Meta:
		model = Valuta
		fields = '__all__'
