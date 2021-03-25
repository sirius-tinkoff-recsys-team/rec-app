from django.db import models
# Create your models here.

class TheUser(models.Model):
    user_id = models.IntegerField()
    name = models.CharField(max_length=100, default="", blank=True)

class Place(models.Model):
    place_id = models.IntegerField(primary_key=True)
    loc_id = models.CharField(max_length=100, default="")
    long = models.FloatField(default=0)
    lat = models.FloatField(default=0)
    url = models.CharField(max_length=100, default="")
    image_url = models.CharField(max_length=100, default="")

class PlaceNear(models.Model):
    place1 = models.IntegerField() #models.ForeignKey(Place, on_delete=models.CASCADE, db_column='place1', related_name='place1')
    place2 = models.IntegerField() #models.ForeignKey(Place, on_delete=models.CASCADE, db_column='place2', related_name='place2')
    dist = models.FloatField() # in km

class TheUserPlace(models.Model):
    user =  models.ForeignKey(TheUser, on_delete=models.CASCADE, db_column='user')
    place = models.ForeignKey(Place, on_delete=models.CASCADE, db_column='place')
    score = models.FloatField(default=1.0, blank=True)
    predicted = models.BooleanField(default=False)



