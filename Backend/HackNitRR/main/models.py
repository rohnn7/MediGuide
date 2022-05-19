import email
from pyexpat import model
from django.db import models
from django.urls import reverse
from datetime import datetime
from django.contrib.auth import get_user_model
User = get_user_model()
import string
from django.utils.text import slugify 
# Create your models here.


class Hospital(models.Model):
    hospital =  models.CharField(max_length=200, default=None, blank=False )

    def __str__(self):
        return self.hospital

class Doctor(models.Model):
    doctor = models.OneToOneField(User, related_name='doctor', on_delete=models.CASCADE )
    work_place = models.ForeignKey(Hospital, related_name='work_place', on_delete=models.CASCADE)

    def __str__(self):
        return self.doctor.first_name

class To_image(models.Model):
    cover_image = models.ImageField(upload_to='CoverImage', null=True, blank=True, default = None,)
    imgslug = models.SlugField(max_length=400, default='')

    def imgsluggify(self):
        strimage = str(self.cover_image)
        self.imgslug =slugify(strimage)
        self.save()

    def __str__(self):
        return str(self.id)


class Results(models.Model):
    result = models.TextField(null=True)

    def __str__(self):
        return str(self.id)
