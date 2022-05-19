from dataclasses import field
from pyexpat import model
from rest_framework.serializers import (ModelSerializer,
                                         CharField,
                                         HyperlinkedIdentityField,
                                         SerializerMethodField,
                                         ValidationError,
                                         )

from main.models import (Hospital, Doctor, To_image,Results)

from rest_framework.authtoken.models import Token

from rest_framework import serializers

from django.contrib.auth import get_user_model
User = get_user_model() 

class HostpitalSerializer(ModelSerializer):
    pk = SerializerMethodField()
    class Meta:
        model=Hospital
        fields=[
            'pk',
            'hospital'
        ]  
    
    def get_pk(self, obj):
        return obj.id 

class ImageSerializer(ModelSerializer):
    # pk = SerializerMethodField()
    class Meta:
        model=To_image
        fields=[
            'cover_image'
        ]  
    
    def get_pk(self, obj):
        return obj.id 

class UserRegisterSerializer(ModelSerializer):
    token = SerializerMethodField()
    pk = SerializerMethodField()
    class Meta:
        model = User
        fields = [
            'token',
            'pk',
            'first_name',
            'last_name',
            'email',
            'username',
            'password',
            'is_staff'
        ]

        extra_kwargs = {"password":
                                {
                                    "write_only":True
                                }
        }


    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user 


    def get_token(self, obj):
        token = Token.objects.get(user=obj)
        return str(token)

    def get_pk(self, obj):
        return obj.id 


class UserLoginSerializer(ModelSerializer):
    class Meta:
        model=User
        fields=[
            'email',
            'password'
        ] 


class DoctorSerializer(ModelSerializer):
    class Meta:
        model = Doctor
        fields = [
            'doctor',
            'work_place'
        ]


class DoctorListSerializer(ModelSerializer):
    doctor_name = SerializerMethodField()
    hospital_name = SerializerMethodField()
    class Meta:
        model = Doctor
        fields = [
            'doctor',
            'work_place',
            'doctor_name',
            'hospital_name'
        ]

    def get_doctor_name(self, obj):
        return obj.doctor.first_name

    def get_hospital_name(self, obj):
        return obj.work_place.hospital

class MLModelSerializer(ModelSerializer):
    class Meta:
        model=Results
        fields=[
            'result'
        ]  