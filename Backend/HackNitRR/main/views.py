from django.shortcuts import render
from rest_framework.generics import (ListAPIView,
                                     RetrieveAPIView,
                                     RetrieveUpdateAPIView,
                                     DestroyAPIView,
                                     CreateAPIView)

from rest_framework.views import APIView  

from main.serializer import (HostpitalSerializer,
                            UserLoginSerializer,
                            UserRegisterSerializer,
                            DoctorSerializer,
                            DoctorListSerializer,
                            ImageSerializer,
                            MLModelSerializer)

from main.models import (Hospital, Doctor, To_image, Results)

import simplejson as json

from rest_framework.views import APIView  

from django.contrib.auth import (authenticate,
                                 login)

from rest_framework.authtoken.models import Token

from rest_framework.response import Response


from rest_framework.status import (HTTP_200_OK, 
                                   HTTP_201_CREATED, 
                                   HTTP_400_BAD_REQUEST,
                                   HTTP_404_NOT_FOUND,
                                   HTTP_204_NO_CONTENT)

from django.contrib.auth import get_user_model
User = get_user_model() 

from django.utils.text import slugify 
import ml_model
import ml_model_ecg
# Create your views here.


class HospitalListView(ListAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HostpitalSerializer


class HostpitalRegisterView(CreateAPIView):
    queryset = Hospital.objects.all()
    serializer_class = HostpitalSerializer



class DoctorListView(ListAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorListSerializer

class DoctorCreateView(CreateAPIView):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer


class UserLoginAPIView(APIView):
    queryset = User.objects.all()
    serializer_class = UserLoginSerializer

    def post(self, request, format=None):                      
        # if request.data['username']:
        #     username = request.data['username']
        #     password = request.data['password']
        #     user = authenticate(username=username, password=password)
       
        
        #     if user is not None:
        #         if user.is_active:
        #             token = Token.objects.get(user=user)
        #             login(request, user)
        #             return Response({'username':user.username, 'pk':user.id, 'token':str(token), 'is_staff':user.is_staff})
        #         return Response(status=HTTP_400_BAD_REQUEST)                
        #     return Response({'message':'Login credentials are not matching'})
        
        # else:
            user_qs = User.objects.get(email=request.data['email'])
            password = request.data['password']
            user = authenticate(username=user_qs.username, password=password)
            print(user)
            if user is not None:
                if user.is_active:
                    token = Token.objects.get(user=user)
                    login(request, user)
                    return Response({'username':user.username, 'pk':user.id, 'token':str(token), 'is_staff':user.is_staff})
                return Response(status=HTTP_400_BAD_REQUEST)                
            return Response({'message':'Login credentials are not matching'})

class UserRegisterView(APIView):
    queryset=User.objects.all()
    serializer_class=UserRegisterSerializer


    # def perform_create(self, serializer):
    #     obj = serializer.save()
    #     obj.set_password(serializer.data['password'])
    #     obj2=serializer.save()
    #     Token.objects.create(user=obj2
        
        
    #     )
    #     print(serializer)

    def post(self, request, format=None):
        if User.objects.filter(email=request.data['email']):
            return Response( {'message': 'Email is already registered'})
        else:
            serializer = UserRegisterSerializer (data=request.data)
            
            if serializer.is_valid():
                serializer.save()
                
                return Response(serializer.data ,status=HTTP_201_CREATED)

        return Response({ 'message':serializer.errors})
            
class ImageUploadView(CreateAPIView):
    queryset=To_image.objects.all()
    serializer_class=ImageSerializer

    def perform_create(self, serializer):            
        serializer.save()
        img = serializer.save()
        strimg = str(img)
        slugimg = slugify(strimg)  
        serializer.save(imgslug=slugimg)

class MLModelView(APIView):
    queryset=Results.objects.all()
    serializer_class=MLModelSerializer

    def post(self, request, format=None):
        listIWantToStore = [1,2,3,4,5,[1,2,3]]
        ml_model.model_function()
        dictionary = {
            'result':json.dumps(listIWantToStore)
        }
        serializer = MLModelSerializer(data=dictionary)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data ,status=HTTP_201_CREATED)

        return Response({ 'message':serializer.errors})


class MLModelViewECG(APIView):
    queryset=Results.objects.all()
    serializer_class=MLModelSerializer

    def post(self, request, format=None):
        listIWantToStore = [1,2,3,4,5,[1,2,3]]
        # ml_model_ecg.model_function(int(request.data['result']))
        ml_model_ecg.model_function(20)
        dictionary = {
            'result':json.dumps(listIWantToStore)
        }
        serializer = MLModelSerializer(data=dictionary)
        if serializer.is_valid():
            serializer.save()
            
            return Response(serializer.data ,status=HTTP_201_CREATED)

        return Response({ 'message':serializer.errors})
