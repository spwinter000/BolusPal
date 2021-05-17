from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class UserInfo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    high_threshold = models.IntegerField(default=120)
    low_threshold = models.IntegerField(default=80)
    carbs_per_unit = models.IntegerField(default=10)

class Bolus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    title = models.CharField(blank=True, max_length=40)
    carb_total = models.IntegerField(default=0)
    blood_sugar = models.IntegerField()
    bolus_total = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

class Food(models.Model):
    bolus = models.ForeignKey(Bolus, on_delete=models.CASCADE, default=1)
    name = models.CharField(blank=True, max_length=40)
    carbs = models.IntegerField(default=0)
    servings = models.IntegerField(default=0)

class Day(models.Model):
    bolus = models.ForeignKey(Bolus, on_delete=models.CASCADE)