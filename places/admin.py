from django.contrib import admin
from .models import Place, PlaceNear, TheUserPlace

class TheUserPlaceAdmin(admin.ModelAdmin):
    list_display = ("user", "place")
# Register your models here.
admin.site.register(Place)
admin.site.register(PlaceNear)
admin.site.register(TheUserPlace, TheUserPlaceAdmin)
