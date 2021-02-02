# from django.contrib.auth.models import User, High_threshold, Low_threshold, Carbs_per_unit, Bolss, Day
from .models import User, High_threshold, Low_threshold, Carbs_per_unit, Bolus, Day
from rest_framework import serializers


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']

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
