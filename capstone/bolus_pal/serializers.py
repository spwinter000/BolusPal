# from django.contrib.auth.models import User, High_threshold, Low_threshold, Carbs_per_unit, Bolss, Day
from .models import User, High_threshold, Low_threshold, Carbs_per_unit, Bolus, Day
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password')

class HighThresholdSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = High_threshold
        fields = ['user', 'high_threshold']

class LowThresholdSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Low_threshold
        fields = ['user', 'low_threshold']

class CarbsPerUnitSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Carbs_per_unit
        fields = ['user', 'carbs_per_unit']

class BolusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bolus
        fields = ['high_threshold', 'low_threshold', 'carbs_per_unit', 'carb_total', 'blood_sugar', 'bolus_total']

class DaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Day
        fields = ['bolus']
