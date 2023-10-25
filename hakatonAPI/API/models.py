from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin


class AppUserManager(BaseUserManager):
	def create_user(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	def create_superuser(self, email, password=None):
		if not email:
			raise ValueError('An email is required.')
		if not password:
			raise ValueError('A password is required.')
		user = self.create_user(email, password)
		user.is_superuser = True
		user.save()
		return user


class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	email = models.EmailField(max_length=50, unique=True)
	username = models.CharField(max_length=50)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['username']
	objects = AppUserManager()
	def __str__(self):
		return self.username

class TodoModel(models.Model):
    projName = models.CharField(max_length=240, blank=True, default="Новый проект")
    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)
    taskPackage = models.CharField(max_length=240, blank=True, default="Новая задача")
    taskName = models.CharField(max_length=240, blank=True)
    goals = models.CharField(max_length=240,  blank=True)
    srok_start = models.DateField(auto_now=True)
    srok_end = models.DateField(blank=True)
    prioritet = models.CharField(max_length=20, blank=True, default="Низкий")
    worker = models.CharField(max_length=20, blank=True)
    done = models.BooleanField(default=False)
    status = models.CharField(max_length=20, blank=True, default="Ожидание начала")
    fileStrId = models.CharField(
        unique=True,
        primary_key=True,
        max_length=255,
        blank=True
    )
    file = models.FileField(upload_to='uploads/', blank=True)