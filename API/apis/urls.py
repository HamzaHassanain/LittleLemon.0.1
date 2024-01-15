from django.contrib import admin
from django.urls import path

from . import views

urlpatterns = [

    path("users/users/me/" , views.getCurrentUser),
    path("users/logout/" , views.logoutUser),
    path("staff/check" , views.checkStaffGroup),
    path("users" , views.createNewUser),

    path("categories" , views.handleCategories),  
    path("categories/<category>" , views.handleCategory),
    path("menu-items" , views.handleMenuItems),
    path("menu-items/<menuItem>" , views.handleMenuItem),

    path("groups/manager/users" , views.handleManagerUsers),
    path("groups/manager/users/<userId>" , views.removeManagerUser),
    path("groups/delivery-crew/users" , views.handleDeliveryCrewUsers),
    path("groups/delivery-crew/users/<userId>" , views.removeDeliveryCrewUser),


    path("cart/menu-items" , views.handleCart),
    path("cart/menu-items/<cartItem>" , views.handleDeleteCartItem),
    path("orders" , views.handleOrders),
    path("orders/<orderId>" , views.handleOrder)

]
