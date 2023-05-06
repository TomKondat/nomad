from rest_framework.serializers import Serializer


class EmptySerializer(Serializer):
    def to_representation(self, instance):
        return {}