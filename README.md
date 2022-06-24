# scogo_Assignment
# Backend Coding Challenge

We are looking for **`production`** Quality Code.

## Prerequisites

* [Node.js](https://nodejs.org/en/)
* [MongoDB](https://www.mongodb.com/)

* You can use any Framework(expressjs, Fastify, Koa, nestjs, etc.).
* You can use any libraries you want.
* Unless explicily specified in API description use the Standard `HTTP Status Code` as per the `HTTP Method` you are using and what type of response you are returning

## Project Description

You have to build 6 APIs for this challenge. 

Schema Definations are as Follow
* **User**
```json
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "mobile": Number,
    "password": String,
    "salt": String
}
```

* **Pizza**
```json
{
    "name": String,
    "price": Number,
    "ingredients": [String]
}
```

* **Order**
```json
{
    "user": ObjectId,
    "pizza": ObjectId,
    "orderDate": Date,
    "isFulfilled": Boolean
}
```

-------------

Description of each API is given below.

1. **SignUp User (POST `/api/signup`) (`PUBLIC`)**
> Request Body for this API  is as follow:
```json
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "mobile": Number,
    "password": String,
    "confirmPassword": String
}
```
> All the fields in **User** Schema are required. Use Hash & Salt to store `password`. It should return the **User** object without password field in response.
> Response Body is as follow:
```json
{
    "firstName": String,
    "lastName": String,
    "email": String,
    "mobile": Number
}
```

-------------

2. **User Login (POST `/api/login`) (`PUBLIC`)**
> Request Body for this API  is as follow:
```json
{
    "email": String,
    "password": String
}
```
> email & password should be used to login. It should return an object with `accessToken` in it. Response HTTP Status Code should be `200`.
> Response Body is as follow:
```json
{
    "accessToken": String
}
```

-------------

3. **Insert Pizza Details (POST `/api/pizzas`) (`SECURED`)**
> Request Body for this API  is as follow:
```json
{
    "name": String,
    "price": Number,
    "ingredients": [String]
}
```
> All the fields in **Pizza** Schema are required. `ingredients` Array should have unique items. It should return the pizza object in response.
> Response Body is as follow:
```json
{
    "name": String,
    "price": Number,
    "ingredients": [String]
}
```

-------------

4. **List of Pizzas (GET `/api/pizzas`) (`SECURED`)**
> It should return the list of **Pizzas**. Response should be an Array of Object.
> Response Body is as follow:
```json
[
    {
        "name": String,
        "price": Number,
        "ingredients": [String]
    }
]
```

-------------

5. **Update Pizza Ingredients (PATCH `/api/pizzas/:id`) (`SECURED`)**
> Request Body for this API  is as follow:
```json
{
    "ingredients": [String]
}
```
> Each item from the request must be inserted in `ingredients` Array. `ingredients` Array should have unique items. It should return the updated object of **Pizza**.
> Response Body is as follow:
```json
{
    "name": String,
    "price": Number,
    "ingredients": [String]
}
```

-------------

6. **Place Order (POST `/api/pizzas/placeOrder`) (`SECURED`)**
> Request Body for this API  is as follow:
```json
{
    "pizzaId": String
}
```
> For this API you have to mandatorily use **`MongoDB Transaction`**. Retrieve the user Id from the authorization token. It should return object in Response Body as follow:
```json
{
    "user": {
        "firstName": String,
        "lastName": String,
        "email": String,
        "mobile": Number
    },
    "pizza": {
        "name": String,
        "price": Number,
        "ingredients": [String]
    },
    "orderDate": Date,
    "isFulfilled": Boolean
}
```


## Note
1. `PUBLIC`: You dont need to a authorize this API
2. `SECURED`: Authorization is required to access these APIs


### All the Best
