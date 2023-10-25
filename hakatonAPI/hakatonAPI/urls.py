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
from API import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path(r'^api/create/$', views.todo_list),
    re_path(r'^api/delete/(\d+)$', views.todo_detail),
    path('api/register', views.UserRegister.as_view(), name='register'),
	path('api/login', views.UserLogin.as_view(), name='login'),
	path('api/logout', views.UserLogout.as_view(), name='logout'),
	path('api/user', views.UserView.as_view(), name='user'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
