# Little Lemon API

## Introduction

Little Lemon is a fictional company for the Meta Backend- Developer Track

## 0- Prerequisites

- Python 3.x.x installed on your machine

- [Pipenv](https://pipenv.pypa.io/en/latest/) installed on your machine

## 1- Installation

- ### Clone the repository

```bash

git https://github.com/HamzaHassanain/LittleLemonAPI.0.0.1.git

cd LittleLemonAPI.0.0.1

```

- ### Install dependencies

```bash
pipenv install
```

- ### Activate the virtual environment

```bash
pipenv shell
```

- ### Run Migrations

```bash
python manage.py makemigrations

python manage.py migrate
```

- ### Run the server

```bash
python manage.py runserver
```

## 2- API Endpoints

```
POST /api/users => Registers a new user and returns a JSON response with the new user data

    Request Body:
    {
        "username": username,
        "email": email,
        "password": password
    }

    Response Body:
    {
        "id": id,
        "username": username,
        "email": email,
    }


GET /api/users/users/me => Returns a JSON response with the current user data

    Response Body:
    {
        "id": id,
        "username": username,
        "email": email,
    }


POST token/login/ => Returns a JSON response with an access token for the user

    Request Body:
    {
        "username": username,
        "password": password
    }

    Response Body:
    {
        "token": token,
    }

GET /api/categories => Returns a JSON response with all the categories

    Response Body:
    [
        {
            "id": id,
            "name": name,
            "description": description,
        },
        ...
    ]


POST /api/categories => Creates a new category and returns a JSON response with the new category data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }
    Request Body:
    {
        "name": name,
        "description": description,
    }

    Response Body:
    {
        "id": id,
        "name": name,
        "description": description,
    }

GET api/categories/<int:category> => Returns a JSON response with the category data

    Response Body:
    {
        "id": id,
        "name": name,
        "description": description,
    }

PUT,PATCH api/categories/<int:category> => Updates the category and returns a JSON response with the updated category data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }
    Request Body:
    {
        "name?": name ,
        "description?": description,
    }

    Response Body:
    {
        "id": id,
        "name": name,
        "description": description,
    }

DELETE api/categories/<int:category> => Deletes the category and returns a JSON response with the deleted category data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }

    Response Body:
    {
      "message" : "category deleted"
    }


GET /api/menu-items => Returns a JSON response with all the menu items

    Response Body:
    [
        {
            "id": id,
            "name": name,
            "description": description,
            "price": price,
            "category": category,
        },
        ...
    ]

POST /api/menu-items => Creates a new menu item and returns a JSON response with the new menu item data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }
    Request Body:
    {
        "name": name,
        "description": description,
        "price": price,
        "category": category,
    }

    Response Body:
    {
        "id": id,
        "name": name,
        "description": description,
        "price": price,
        "category": category,
    }


GET /api/menu-items/<int:menu_item> => Returns a JSON response with the menu item data

    Response Body:
    {
        "id": id,
        "name": name,
        "description": description,
        "price": price,
        "category": category,
    }


PUT,PATCH /api/menu-items/<int:menu_item> => Updates the menu item and returns a JSON response with the updated menu item data

        Headers:
        {
            Authorizations: Token manager-admin-token
        }
        Request Body:
        {
            "name?": name,
            "description?": description,
            "price?": price,
            "category?": category,
        }

        Response Body:
        {
            "id": id,
            "name": name,
            "description": description,
            "price": price,
            "category": category,
            "image_url": image_url,
        }


DELETE /api/menu-items/<int:menu_item> => Deletes the menu item and returns a JSON response with the deleted menu item data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }

    Response Body:
    {
      "message" : "menu item deleted"
    }


GET /api/groups/manager/users => Returns a JSON response with all the users that are in the manager group

    Headers:
    {
        Authorizations: Token manager-admin-token
    }

    Response Body:
    [
        {
            "id": id,
            "username": username,
            "email": email,
        },
        ...
    ]

POST /api/groups/manager/users => Makes a user a manager and returns a JSON response with the updated user data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }
    Request Body:
    {
        "username": username,
    }

    Response Body:
    {
        "id": id,
        "username": username,
        "email": email,
    }

DELETE /api/groups/manager/users/<userId> => Removes a user from the manager group and returns a JSON response with the updated user data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }
    Request Body:
    {
        "username": username,
    }

    Response Body:
    {
        "message" :  msg
    },


GET /api/groups/delivery-crew/users => Returns a JSON response with all the users that are in the delivery crew group

    Headers:
    {
        Authorizations: Token manager-admin-token
    }

    Response Body:
    [
        {
            "id": id,
            "username": username,
            "email": email,
        },
        ...
    ]

POST /api/groups/delivery-crew/users => Makes a user a delivery crew and returns a JSON response with the updated user data

        Headers:
        {
            Authorizations: Token manager-admin-token
        }
        Request Body:
        {
            "username": username,
        }

        Response Body:
        {
            "id": id,
            "username": username,
            "email": email,
        }


DELETE /api/groups/delivery-crew/users/<userId> => Removes a user from the delivery crew group and returns a JSON response with the updated user data

    Headers:
    {
        Authorizations: Token manager-admin-token
    }
    Request Body:
    {
        "username": username,
    }

    Response Body:
    {
        "message" :  msg
    },


GET /api/cart/menu-items => Returns a JSON response with all the menu items in the cart for the user with the given token

    Headers:
    {
        Authorizations: Token user-token
    }

    Response Body:
    [
        {
            "menu_item":{
                "id": id,
                "name": name,
                "description": description,
                "price": price,
                "category": {
                    "id": id,
                    "name": name,
                    "description": description,
                },
                "image_url": image_url,
            }
            "quantity":quantity
            "unit_price": unit_price
            "total": total
        },
        ...
    ]

POST /api/cart/menu-items => Adds a menu item to the cart for the user with the given token and returns a JSON response with the updated cart

    Headers:
    {
        Authorizations: Token user-token
    }
    Request Body:
    {
        "menu_item_id": menu_item,
        "quantity": quantity,
    }

    Response Body:
    {
        "menu_item": {
            "id": id,
            "name": name,
            "description": description,
            "price": price,
            "category": {
                    "id": id,
                    "name": name,
                    "description": description,
                },
            "image_url": image_url,
        },
        "quantity" : quantity
        "unit_price": unit_price
    }

DELETE /api/cart/menu-items=> Deletes the menu item from the cart for the user with the given token and returns a JSON response with the updated cart

    Headers:
    {
        Authorizations: Token user-token
    }

    Request Body:
    {
        "menu_item_id": menu_item,
    }

    Response Body:
    {
        "message" :  msg
    }


GET /api/orders =>
    IF user is a manager: Returns a JSON response with all the orders
    IF user is a delivery crew: Returns a JSON response with all the orders assigned to the delivery crew
    IF user is a user: Returns a JSON response with all the orders placed by the user

    Headers:
    {
        Authorizations: Token user-token/managet-admin-token/delivery-crew-token
    }

    Response Body
    {
        "items":[
            {
                "menu_item": {
                    "id": id,
                    "name": name,
                    "description": description,
                    "price": price,
                    "category": {
                            "id": id,
                            "name": name,
                            "description": description,
                        },
                    "image_url": image_url,
                },
                "quantity" : quantity
                "unit_price": unit_price
            },
            ...
        ],
        "total": total,
        "delivery_crew": {
            "id": id,
            "username": username,
            "email": email,
        },
    }


POST /api/orders =>
    IF user has any cart items in the cart: Creates a new order and returns a JSON response with the new order data
    IF user has no cart items in the cart: Returns a JSON response with an error message

    Headers:
    {
        Authorizations: Token user-token
    }
    Request Body:
    {
        "date": date,
    }

    Response Body:
    {
        "message" :  msg
    }


GET /api/orders/<orderId> => Returns the order with the given id

    Headers:
    {
        Authorizations: Token user-token/managet-admin-token/delivery-crew-token
    }

    Response Body:
    {
        "items":[
            {
                "menu_item": {
                    "id": id,
                    "name": name,
                    "description": description,
                    "price": price,
                    "category": {
                            "id": id,
                            "name": name,
                            "description": description,
                        },
                    "image_url": image_url,
                },
                "quantity" : quantity
                "unit_price": unit_price
            },
            ...
        ],
        "total": total,
        "delivery_crew": {
            "id": id,
            "username": username,
            "email": email,
        },
        "status": status,
        "date": date,
    }


PUT,PATCH /api/orders/<orderId> =>
    IF user is a manager: Updates the order delivery crew and returns a JSON response with the updated order data
    IF user is customer or delivery crew: Updates the order status and returns a JSON response with the updated order data

    IF IS MANAGER:

        Request Body:
        {
            "delivery_crew": delivery_crew_username,
        }

        Response Body {
            "message" :  msg
        }

    IF IS CUSTOMER OR DELIVERY CREW:

        Request Body:
        {
            "status": status,
        }

        Response Body {
            "message" :  msg
        }



FOR ALL RESPONSES:

    IF ERROR:

        Response Body:
        {
            "error" :  errors
        }

    IF SUCCESS:

        THEN THE EXPLAINED RESPONSE BODY ABOVE

```
