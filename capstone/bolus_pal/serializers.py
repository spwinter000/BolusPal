# from django.contrib.auth.models import User, High_threshold, Low_threshold, Carbs_per_unit, Bolss, Day
from .models import CustomUser, Bolus, Day
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework import serializers


class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['url', 'username', 'email', 'high_threshold', 'low_threshold', 'carbs_per_unit']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # handles the manual creation of a new token
    @classmethod
    def get_token(cls, user):
        # manual creation of new token to add to user field
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        token['username'] = user.username
        return token

class UserSerializerWithToken(serializers.ModelSerializer):

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)


    # determines how object being serialized gets saved to the DB
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    # indicate which model each serializer will be representing and which fields we want the serializer to include
    class Meta:
        model = CustomUser
        fields = ('token', 'username', 'password')

# class HighThresholdSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = High_threshold
#         fields = ['user', 'high_threshold']

# class LowThresholdSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Low_threshold
#         fields = ['user', 'low_threshold']

# class CarbsPerUnitSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Carbs_per_unit
#         fields = ['user', 'carbs_per_unit']

class BolusSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Bolus
        fields = ['user', 'carb_total', 'blood_sugar', 'bolus_total']

class DaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Day
        fields = ['bolus']
