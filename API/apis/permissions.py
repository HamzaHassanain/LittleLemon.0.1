from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser
    
class IsManagerOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.groups.filter(name="manager").exists()
class IsDeliveryOrAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_superuser or request.user.groups.filter(name="delivery").exists()



class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET" , "HEAD" , "OPTIONS"]:
            return True
        return request.user.is_superuser

class IsManagerOrAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in ["GET" , "HEAD" , "OPTIONS"]:
            return True
        return request.user.is_superuser or request.user.groups.filter(name="manager").exists()