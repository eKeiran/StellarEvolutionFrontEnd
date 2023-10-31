from django.db import models

class StellarData(models.Model):
    bv = models.FloatField()
    plx = models.FloatField()
    vmag = models.FloatField()
    spType = models.CharField(max_length=1)

# Create your models here.
