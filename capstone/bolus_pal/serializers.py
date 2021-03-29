# from django.contrib.auth.models import User, High_threshold, Low_threshold, Carbs_per_unit, Bolss, Day
from .models import User, UserInfo, Bolus, Food, Day
from rest_framework_jwt.settings import api_settings
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    # determines how object being serialized gets saved to the DB
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # handles the manual creation of a new token
    @classmethod
    def get_token(cls, user):
        # manual creation of new token to add to user field
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # token['username'] = user.username
        return token

class UserInfoSerializer(serializers.ModelSerializer):
    user: serializers.IntegerField()
    high_threshold = serializers.IntegerField(default=120)
    low_threshold = serializers.IntegerField(default=80)
    carbs_per_unit = serializers.IntegerField(default=10)
    
    class Meta:
        model = UserInfo
        fields = ['id', 'user', 'high_threshold', 'low_threshold', 'carbs_per_unit']

        def create(self, validated_data):
            instance = self.Meta.model(**validated_data)
            instance.save()
            return instance

# changed from HyperlinkedModelSerializer
class BolusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bolus
        fields = ['id', 'title', 'user', 'carb_total', 'blood_sugar', 'bolus_total', 'timestamp']

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = ['bolus', 'name', 'carbs', 'servings']

class DaySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Day
        fields = ['bolus']
