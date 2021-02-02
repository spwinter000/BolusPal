from django.contrib import admin
from .models import User, High_threshold, Low_threshold, Carbs_per_unit, Bolus, Day

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ('username',)

class HighThresholdAdmin(admin.ModelAdmin):
    list_display = ('user', 'high_threshold',)

class LowThresholdAdmin(admin.ModelAdmin):
    list_display = ('user', 'low_threshold',)

class CarbsPerUnitAdmin(admin.ModelAdmin):
    list_display = ('user', 'carbs_per_unit',)

class BolusAdmin(admin.ModelAdmin):
    list_display = ('user', 'high_threshold', 'low_threshold', 'carbs_per_unit', 'carb_total', 'blood_sugar', 'bolus_total',)

class DayAdmin(admin.ModelAdmin):
    list_display = ('bolus',)

admin.site.register(User, UserAdmin)
admin.site.register(High_threshold, HighThresholdAdmin)
admin.site.register(Low_threshold, LowThresholdAdmin)
admin.site.register(Carbs_per_unit, CarbsPerUnitAdmin)
admin.site.register(Bolus, BolusAdmin)
admin.site.register(Day, DayAdmin)