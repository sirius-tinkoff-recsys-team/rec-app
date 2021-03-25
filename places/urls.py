from django.urls import path

from . import views

app_name = 'teacher'
urlpatterns = [
    path('', views.index, name='main'),
    path('rec/', views.recommend, name='rec'),
]