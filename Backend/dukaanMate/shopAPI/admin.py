from django.contrib import admin
from .models import Cart, CartItem, Product, Transaction

admin.site.register([Product, Cart, CartItem, Transaction])