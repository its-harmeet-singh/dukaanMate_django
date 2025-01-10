from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    city = models.CharField(max_length=100, blank=100, null=True)
    state = models.CharField(max_length=100, blank=100, null=True)
    address = models.TextField(blank=100, null=True)
    phone = models.CharField(max_length=15, blank=100, null=True)
    
    def __str__(self):
        return self.username