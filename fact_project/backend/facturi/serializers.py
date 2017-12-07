from rest_framework.serializers import ModelSerializer
 
from backend.facturi.models import Fac,FacDet

class FacSerializer(ModelSerializer):
	"""
	Create Facturi serializer.

	"""

	class Meta:
		model = Fac
		fields = '__all__'

class FacDetSerializer(ModelSerializer):
	"""
	Create Facturi detail serializer.

	"""

	class Meta:
		model = FacDet
		fields = '__all__'
