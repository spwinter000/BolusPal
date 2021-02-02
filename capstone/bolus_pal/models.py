from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class High_threshold(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)
    high_threshold = models.IntegerField(default=120)

class Low_threshold(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1)   
    low_threshold = models.IntegerField(default=80)

class Carbs_per_unit(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, default=1) 
    carbs_per_unit = models.IntegerField(default=10)

class Bolus(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)
    high_threshold = models.ForeignKey(High_threshold, on_delete=models.CASCADE)
    low_threshold = models.ForeignKey(Low_threshold, on_delete=models.CASCADE)
    carbs_per_unit = models.ForeignKey(Carbs_per_unit, on_delete=models.CASCADE)
    carb_total = models.IntegerField(default=0)
    blood_sugar = models.FloatField()
    # food_items = models ---> not sure yet
    bolus_total = models.FloatField()

class Day(models.Model):
    bolus = models.ForeignKey(Bolus, on_delete=models.CASCADE)