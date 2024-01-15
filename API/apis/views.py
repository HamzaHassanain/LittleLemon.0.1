from django.contrib.auth.models import User,Group
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework import permissions
from django.core.paginator import Paginator
from . import models as apis_models
from . import serializers as apis_serializers
from . import permissions as apis_permissions
from . import utils

@api_view(["POST"])
def createNewUser(request):
    # print(request.data)
    serializer = apis_serializers.UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        user.set_password(request.data["password"])
        user.save()
        return Response(serializer.data)
    else :
        return Response(serializer.errors , status=400)
@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def logoutUser(request):
    try:
        Token.objects.get(user=request.user).delete()
        return Response({"message" : "logged out"})
    except Exception as e:
        print(e)
        return Response({"error" : "user not found"})

@api_view(["GET"])
@permission_classes([permissions.IsAuthenticated])
def getCurrentUser(request):
    print(request.user)
    try:
        user = apis_serializers.UserSerializer(request.user)
        return Response(user.data)
    except Exception as e:
        print(e)
        return Response({"error" : "user not found"})
    

@api_view(["GET" , "POST"])
@permission_classes([apis_permissions.IsManagerOrAdmin])
def handleManagerUsers(request):
    if request.method == "GET":
        users = User.objects.filter()
        serializer = apis_serializers.UserGETSerializer(users , many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        username = request.data["username"]
        user = User.objects.get(username=username)
        user.groups.add(Group.objects.get(name="manager"))
        user.save()

        serializer = apis_serializers.UserGETSerializer(user)
        return Response(serializer.data , status=201)


@api_view(["DELETE"])
@permission_classes([apis_permissions.IsManagerOrAdmin])
def removeManagerUser(request , userId):
    try:
        user = User.objects.get(id=userId)
        user.groups.remove(Group.objects.get(name="manager"))
        user.save()
        msg = "user {} removed from manager group".format(user.username)
        return Response({"message" :  msg})
    except Exception as e:
        print(e)
        return Response({"error" : "user not found in manager group"})
    



@api_view(["GET" , "POST"])
@permission_classes([apis_permissions.IsManagerOrAdmin])
def handleDeliveryCrewUsers(request):
    if request.method == "GET":
        users = User.objects.filter(groups__name="delivery")
        serializer = apis_serializers.UserSerializer(users , many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        username = request.data["username"]
        user = User.objects.get(username=username)
        user.groups.add(Group.objects.get(name="delivery"))
        user.save()

        serializer = apis_serializers.UserSerializer(user )
        return Response(serializer.data , status=201)
    
@api_view(["DELETE"])
@permission_classes([apis_permissions.IsManagerOrAdmin])
def removeDeliveryCrewUser(request , userId):
    try:
        user = User.objects.get(id=userId)
        user.groups.remove(Group.objects.get(name="delivery"))
        user.save()
        msg = "user {} removed from delivery group".format(user.username)
        return Response({"message" :  msg})
    except Exception as e:
        print(e)
        return Response({"error" : "user not found in delivery group"})
    


@api_view(["GET" , "POST"])
@permission_classes([apis_permissions.IsManagerOrAdminOrReadOnly])
def handleCategories(request):
    if request.method == "GET":
        categories = apis_models.Category.objects.all()
        serializer = apis_serializers.CategorySerializer(categories , many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = apis_serializers.CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data , status=201)
        else :
            return Response(serializer.errors , status=400  ) 
        
@api_view(["GET" , "PUT" , "DELETE" , "PATCH"])
@permission_classes([apis_permissions.IsManagerOrAdminOrReadOnly])
def handleCategory(request , category):
    try:
        category = apis_models.Category.objects.get(id=category)
    except Exception as e:
        print(e)
        return Response({"error" : "category not found"})
    if request.method == "GET":
        serializer = apis_serializers.CategorySerializer(category)
        return Response(serializer.data)
    elif request.method == "PUT" or request.method == "PATCH":
        serializer = apis_serializers.CategorySerializer(category , data=request.data , partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else :
            return Response(serializer.errors , status=400)
    elif request.method == "DELETE":
        category.delete()
        return Response({"message" : "category deleted"})


@api_view(["GET" , "POST"])
@permission_classes([apis_permissions.IsManagerOrAdminOrReadOnly])
def handleMenuItems(request):

    if request.method == "GET":
    
        query_params = request.query_params
        queryset = None

        if query_params.get("category"):
            queryset = apis_models.MenuItem.objects.filter(category__name=query_params["category"]).select_related("category")
        else :
            queryset = apis_models.MenuItem.objects.all().select_related("category")
        
        if query_params.get("ordering"):
            queryset = queryset.order_by(query_params.get("ordering"))

        if query_params.get("page"):
            try:
                paginator = Paginator(queryset, 5)
                page_number = query_params.get("page")
                page_obj = paginator.get_page(page_number)
                serializer = apis_serializers.MenuItemSerializer(page_obj , many=True)
                return Response(serializer.data)
            except Exception as e:
                print(e)
                return Response({"error" : "invalid page number"})


        serializer = apis_serializers.MenuItemSerializer(queryset , many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        serializer = apis_serializers.MenuItemCreateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            data = apis_serializers.MenuItemSerializer(serializer.instance).data
            return Response(data , status=201)
        else :
            return Response(serializer.errors , status=400)
 

@api_view(["GET" , "PUT" , "DELETE" , "PATCH"])
@permission_classes([apis_permissions.IsManagerOrAdminOrReadOnly])
def handleMenuItem(request , menuItem):
    try:
        menuItem =  apis_models.MenuItem.objects.get(id=menuItem)
    except Exception as e:
        print(e)
        return Response({"error" : "menu item not found"})
    if request.method == "GET":
        serializer = apis_serializers.MenuItemSerializer(menuItem)
        return Response(serializer.data)
    elif request.method == "PUT" or request.method == "PATCH":
        serializer = apis_serializers.MenuItemCreateSerializer(menuItem , data=request.data , partial=True)
        if serializer.is_valid():
            serializer.save()
            data = apis_serializers.MenuItemSerializer(menuItem).data
            return Response(data)
        else :
            return Response(serializer.errors , status=400)
    elif request.method == "DELETE":
        menuItem.delete()
        return Response({"message" : "menu item deleted"})
    


@api_view(["GET" , "POST" , "DELETE"])
@permission_classes([permissions.IsAuthenticated])
def handleCart(request):
    
    if request.method == "GET":
        cart_items = apis_models.CartItem.objects.filter(user=request.user, active=True)
        serializer = apis_serializers.CartItemSerializer(cart_items , many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        menu_item_id = None
        quantity = None 
        try:
            menu_item_id = request.data["menuitem"]
            quantity = int(request.data["quantity"])
        except Exception as e:
            print(e)
        if not quantity or not menu_item_id or quantity < 1:
            return Response({"error" : "invalid data: quantity Must be 1 or greater  and menuitem must be valid " } , status=400)
        data={
            "user" : request.user.id,
            "menu_item" : menu_item_id,
            "quantity" : quantity
        }
        cartItem = apis_serializers.CartItemCreateSerializer(data=data)
        if cartItem.is_valid():
            cartItem.save()
            data = apis_serializers.CartItemSerializer(cartItem.instance).data
            return Response(data , status=201)
        else :
            return Response(cartItem.errors , status=400)

    elif request.method == "DELETE":
        memuitem_id = request.data["menuitem"]
        try:
            cart_item = apis_models.CartItem.objects.get(user=request.user , menu_item=memuitem_id)
            cart_item.delete()
            return Response({"message" : "cart item deleted"})
        except Exception as e:
            print(e)
            return Response({"error" : "cart item not found"})
        
@api_view(["GET" , "POST"])
@permission_classes([permissions.IsAuthenticated])
def handleOrders(request):
    
    if request.method == "GET":
        orders = apis_models.Order.objects.filter(user=request.user)
        if utils.is_manager_or_admin(request.user):
            orders = apis_models.Order.objects.all()
        elif utils.is_delivery(request.user):
            orders = apis_models.Order.objects.filter(delivery_crew=request.user)
    
        serializer = apis_serializers.OrderSerializer(orders , many=True)
        return Response(serializer.data)
    
    elif request.method == "POST":
        date = request.data["date"]
        cart_items = apis_models.CartItem.objects.filter(user=request.user , active=True)
        if len(cart_items) == 0:
            return Response({"error" : "cart is empty"} , status=400)
        order = apis_models.Order.objects.create(user=request.user , date=date)
        for cart_item in cart_items:
            order.items.add(cart_item)

        order.save()
        cart_items.update(active=False)

        return Response({"message" : "order created"} , status=201)
    

@api_view(["GET" , "PUT" , "DELETE" , "PATCH"])
@permission_classes([permissions.IsAuthenticated])
def handleOrder(request , orderId):
    if request.method == "GET":
        order = apis_models.Order.objects.get(id=orderId)
        if not order:
            return Response({"error" : "order not found"})
        serializer = apis_serializers.OrderSerializer(order)
        return Response(serializer.data)
    elif request.method == "PUT" or request.method == "PATCH":
        if utils.is_manager_or_admin(request.user):
            devlivery_crew_username = request.data["delivery_crew"]
            try:
                order = apis_models.Order.objects.get(id=orderId)
                order.delivery_crew = User.objects.get( username=devlivery_crew_username )
                order.save()
                return Response({"message" : "order delivery member updated"})
            except Exception as e:
                print(e)
                return Response({"error" : "order not found"})
        else :
            try:
                is_delivery = utils.is_delivery(request.user)
                status = request.data["status"]
                
                order = apis_models.Order.objects.get(id=orderId , user=request.user) if not is_delivery else apis_models.Order.objects.get(id=orderId , delivery_crew=request.user)
                order.status = status
                order.save()
                return Response({"message" : "order status updated"})
            except Exception as e:
                print(e)
                return Response({"error" : "order not found"})
    elif request.method == "DELETE":
        if utils.is_manager_or_admin(request.user):
            try:
                order = apis_models.Order.objects.get(id=orderId)
                order.delete()
                return Response({"message" : "order deleted"})
            except Exception as e:
                print(e)
                return Response({"error" : "order not found"})
        else:
            return Response({"error" : "you are not allowed to delete order"} , status=403)
        





@api_view(["DELETE"])
@permission_classes([permissions.IsAuthenticated])
def handleDeleteCartItem(request , cartItem):
    try:
        cart_item = apis_models.CartItem.objects.get(id=cartItem , user=request.user)
        cart_item.delete()
        return Response({"message" : "cart item deleted"})
    except Exception as e:
        print(e)
        return Response({"error" : "cart item not found"})
    




@api_view(["POST"])
@permission_classes([permissions.AllowAny])
def checkStaffGroup(request):
    try:
        role = request.data["role"]
        username = request.data["username"]
        user = User.objects.get(username=username)
        if role == "admin":
            if utils.is_admin(user):
                return Response({"isValid" : "True"})
            else:
                return Response({"isValid" : "False"})
        elif role == "manager":
            if utils.is_manager_or_admin(user):
                return Response({"isValid" : "True"})
            else:
                return Response({"isValid" : "False"})
        elif role == "delivery":
            if utils.is_delivery(user):
                return Response({"isValid" : "True"})
            else:
                return Response({"isValid" : "False"})
        else :
            return Response({"isValid" : "False"})

       
        
    except Exception as e:
        print(e)
        return Response({"error" : "group not found" , "isValid" : "False"})