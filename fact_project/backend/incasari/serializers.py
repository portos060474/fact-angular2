from rest_framework.serializers import ModelSerializer
 
from backend.incasari.models import Incasari

class IncasariSerializer(ModelSerializer):
	"""
	Create Incasari serializer.

	"""

	class Meta:
		model = Incasari
		fields = '__all__'
