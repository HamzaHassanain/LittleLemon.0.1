from django.db import models
from django.contrib.auth.models import User,Group

class Category(models.Model):
    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000 , null=True , blank=True)    

    def __str__(self):
        return self.name
    

class MenuItem(models.Model):

    id=models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=1000 , null=True , blank=True)
    long_description = models.TextField(null=True , blank=True)
    price = models.DecimalField(max_digits=10 , decimal_places=2)
    category = models.ForeignKey(Category , on_delete=models.CASCADE)
    image_url = models.CharField(max_length=1000 , null=True , blank=True)
    def __str__(self):
        return self.name
    


class CartItem(models.Model):
    id=models.AutoField(primary_key=True)
    user = models.ForeignKey(User , on_delete=models.CASCADE ,default=1)   
    menu_item = models.ForeignKey(MenuItem , on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    active=models.BooleanField(default=True)
    def __str__(self):
        return f"{self.user.username} - {self.menu_item.name} - {self.quantity}"
    
    @property
    def unit_price(self):
        return self.menu_item.price

    @property
    def total(self):
        return self.quantity * self.unit_price
    

class Order(models.Model):
    
    id=models.AutoField(primary_key=True)
    user = models.ForeignKey(User , on_delete=models.CASCADE ,default=1 , related_name="user")
    items = models.ManyToManyField(CartItem)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField()
    status = models.BooleanField(default=False)
    deliverd = models.BooleanField(default=False)
    delivery_crew = models.ForeignKey(User , on_delete=models.CASCADE , related_name="delivery_crew" , null=True , blank=True)


    def __str__(self):
        return f"{self.id} {self.user.username} - {self.date}"

    @property
    def total(self):
        total = 0
        for item in self.items.all():
            total += item.total
        return total
    