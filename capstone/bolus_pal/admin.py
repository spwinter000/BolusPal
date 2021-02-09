from django.contrib import admin
from .models import CustomUser, Bolus, Day

# Register your models here.
# class UserAdmin(admin.ModelAdmin):
#     list_display = ('username',)

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ('username','high_threshold', 'low_threshold', 'carbs_per_unit',)

# class HighThresholdAdmin(admin.ModelAdmin):
#     list_display = ('user', 'high_threshold',)

# class LowThresholdAdmin(admin.ModelAdmin):
#     list_display = ('user', 'low_threshold',)

# class CarbsPerUnitAdmin(admin.ModelAdmin):
#     list_display = ('user', 'carbs_per_unit',)

class BolusAdmin(admin.ModelAdmin):
    list_display = ('user', 'carb_total', 'blood_sugar', 'bolus_total',)

class DayAdmin(admin.ModelAdmin):
    list_display = ('bolus',)

admin.site.register(CustomUser, CustomUserAdmin)
# admin.site.register(High_threshold, HighThresholdAdmin)
# admin.site.register(Low_threshold, LowThresholdAdmin)
# admin.site.register(Carbs_per_unit, CarbsPerUnitAdmin)
admin.site.register(Bolus, BolusAdmin)
admin.site.register(Day, DayAdmin)