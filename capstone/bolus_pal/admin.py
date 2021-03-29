from django.contrib import admin
from .models import User, UserInfo, Bolus, Food, Day

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('username',)

class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('user','high_threshold', 'low_threshold', 'carbs_per_unit',)

class BolusAdmin(admin.ModelAdmin):
    list_display = ('user', 'carb_total', 'blood_sugar', 'bolus_total',)

class FoodAdmin(admin.ModelAdmin):
    list_display = ('bolus', 'name', 'carbs', 'servings',)

class DayAdmin(admin.ModelAdmin):
    list_display = ('bolus',)

admin.site.register(User, UserAdmin)
admin.site.register(UserInfo, UserInfoAdmin)
admin.site.register(Food, FoodAdmin)
admin.site.register(Bolus, BolusAdmin)
admin.site.register(Day, DayAdmin)