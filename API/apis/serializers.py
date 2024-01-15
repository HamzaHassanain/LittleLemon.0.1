from django.contrib.auth.models import User,Group
from . models import MenuItem,Category, CartItem,Order
from rest_framework import serializers

def valid_email(email):
    import re
    if re.match(r"^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$" , email):
        return True
    return False

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    class Meta:
        model = User
        fields = ["id","username", "email"]
    
    def validate(self, attrs):
        if not valid_email(attrs["email"]):
            raise serializers.ValidationError({"email" : "Email is not valid"})            
        if User.objects.filter(email=attrs["email"]).exists():
            raise serializers.ValidationError({"email" : "Email already exists"})
        return super().validate(attrs)

class UserGETSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField(
        method_name='get_role'
    )
    class Meta:
        model = User
        fields = ["id","username", "email" , "role"]

    def get_role(self , obj):
        if obj.is_superuser:
            return "manager"
        if obj.groups.filter(name="manager").exists():
            return "manager"
        if obj.groups.filter(name="delivery").exists():
            return "delivery"
        return "customer"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"

class MenuItemSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = MenuItem
        fields = "__all__"
    
class MenuItemCreateSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    class Meta:
        model = MenuItem
        fields = "__all__"

class CartItemCreateSerializer(serializers.ModelSerializer):
    menu_item = serializers.PrimaryKeyRelatedField(queryset=MenuItem.objects.all())
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    
    class Meta:
        model = CartItem
        fields = ["menu_item" , "quantity" , "unit_price" , "total" , "user"]
class CartItemSerializer(serializers.ModelSerializer):
    menu_item = MenuItemSerializer()
    class Meta:
        model = CartItem
        fields = ["menu_item" , "quantity" , "unit_price" , "total" , "id"]

class OrderSerializer(serializers.ModelSerializer):
    delivery_crew = UserSerializer()
    user = UserSerializer()
    items = CartItemSerializer(many=True)
    class Meta:
        model = Order
        fields = [ "delivery_crew"  , "id" , "total" , "date" , "status" , "user"  ,"items" ]

    def create(self, validated_data):
        items = validated_data.pop("items")
        order = Order.objects.create(**validated_data)
        for item in items:
            CartItem.objects.create(order=order , **item)
        return order