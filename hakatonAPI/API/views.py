import os

from django.contrib.auth import login, logout
from rest_framework import generics
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.authentication import SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import *

class TodoAPIViewCreate(generics.ListCreateAPIView):
	authentication_classes = [SessionAuthentication]
	permission_classes = [IsAuthenticated]

	queryset = TodoModel.objects.all()
	serializer_class = TodoModelSerializer


class TodoAPIDelete(generics.DestroyAPIView):
	authentication_classes = [SessionAuthentication]
	permission_classes = [IsAuthenticated]

	queryset = TodoModel.objects.all()
	serializer_class = TodoModelSerializer


class TodoAPIUpdate(generics.UpdateAPIView):
	authentication_classes = [SessionAuthentication]
	permission_classes = [IsAuthenticated]

	queryset = TodoModel.objects.all()
	serializer_class = TodoModelSerializer



class FileUploadView(APIView):
    def post(self, request):
        file_serializer = FileSerializer(data=request.data)
        if file_serializer.is_valid():
            file_serializer.save()
            return Response(file_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FileDownloadView(APIView):
    def get(self, request, file_id):
        try:
            file_obj = TodoModel.objects.get(fileStrId=file_id)
            file_path = file_obj.file.path
            with open(file_path, 'rb') as f:
                response = HttpResponse(f.read(), content_type="application/octet-stream")
                response['Content-Disposition'] = 'attachment; filename="' + os.path.basename(file_path) + '"'
                return response
        except TodoModel.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)



class UserRegister(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		clean_data = custom_validation(request.data)
		serializer = UserRegisterSerializer(data=clean_data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.create(clean_data)
			if user:
				return Response(serializer.data, status=status.HTTP_201_CREATED)
		return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
	permission_classes = (permissions.AllowAny,)
	authentication_classes = (SessionAuthentication,)
	
	def post(self, request):
		data = request.data
		assert validate_email(data)
		assert validate_password(data)
		serializer = UserLoginSerializer(data=data)
		if serializer.is_valid(raise_exception=True):
			user = serializer.check_user(data)
			login(request, user)
			return Response(serializer.data, status=status.HTTP_200_OK)


class UserLogout(APIView):
	permission_classes = (permissions.AllowAny,)
	def post(self, request):
		logout(request)
		return Response(status=status.HTTP_200_OK)


class UserView(APIView):
	permission_classes = (permissions.IsAuthenticated,)
	authentication_classes = (SessionAuthentication,)
	
	def get(self, request):
		serializer = UserSerializer(request.user)
		return Response({'user': serializer.data}, status=status.HTTP_200_OK)