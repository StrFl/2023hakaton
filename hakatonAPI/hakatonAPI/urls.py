"""hakatonAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView

from API.views import * 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_schema', get_schema_view(title='API Schema', description='api documentation'), name='api_schema'),
    path('api/docs/', TemplateView.as_view(
        template_name='docs.html',
        extra_context={'schema_url':'api_schema'}
        ), name='swagger-ui'),

    path('api/view/', TodoList.as_view()),
    path('api/detail/<int:pk>/', TodoDetail.as_view()),

    path('api/register/', UserRegister.as_view(), name='register'),
	path('api/login/', UserLogin.as_view(), name='login'),
	path('api/logout/', UserLogout.as_view(), name='logout'),
	path('api/user/', UserView.as_view(), name='user'),

    path('api/upload/', FileUploadView.as_view(), name='file-upload'),
    path('api/download/<str:file_id>/', FileDownloadView.as_view(), name='file-download'),

]
