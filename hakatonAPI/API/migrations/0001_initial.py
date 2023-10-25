# Generated by Django 4.1.4 on 2023-10-25 13:36

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='AppUser',
            fields=[
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('username', models.CharField(max_length=50)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TodoModel',
            fields=[
                ('projName', models.CharField(blank=True, max_length=240)),
                ('taskPackage', models.CharField(blank=True, default='Новая задача', max_length=240)),
                ('taskName', models.CharField(blank=True, max_length=240)),
                ('goals', models.CharField(blank=True, max_length=240)),
                ('srok_start', models.DateField(auto_now=True)),
                ('srok_end', models.DateField(blank=True)),
                ('prioritet', models.CharField(blank=True, default='Низкий', max_length=20)),
                ('worker', models.CharField(blank=True, max_length=20)),
                ('done', models.BooleanField(default=False)),
                ('status', models.CharField(blank=True, default='Ожидание начала', max_length=20)),
                ('fileStrId', models.CharField(blank=True, max_length=255, primary_key=True, serialize=False, unique=True)),
                ('file', models.FileField(blank=True, upload_to='uploads/')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
