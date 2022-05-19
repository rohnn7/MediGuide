from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from main.views import (HospitalListView,
                        HostpitalRegisterView,
                        DoctorListView,
                        DoctorCreateView,
                        UserLoginAPIView,
                        UserRegisterView,
                        ImageUploadView,
                        MLModelView, 
                        MLModelViewECG)

app_name = 'main'

urlpatterns = [
    url(r'hospital/list/$',HospitalListView.as_view(), name='hospital_list'),#registers the user
    url(r'hospital/create/$',HostpitalRegisterView.as_view(), name='hospital_register'),
    url(r'doctor/create/$',DoctorCreateView.as_view(), name='doctor_create'),
    url(r'doctor/list/$',DoctorListView.as_view(), name='doctor_list'),
    url(r'doctor/create/$',DoctorCreateView.as_view(), name='doctor_create'),
    url(r'user/login/$',UserLoginAPIView.as_view(), name='login'),
    url(r'user/register/$',UserRegisterView.as_view(), name='register'),
    url(r'image/upload/$',ImageUploadView.as_view(), name='upload'),
    url(r'ml/$',MLModelView.as_view(), name='ml'),
    url(r'ml_ecg/$',MLModelViewECG.as_view(), name='ml_ecg'),
]