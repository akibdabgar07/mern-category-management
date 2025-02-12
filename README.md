<<<<<<< HEAD
# mern-category-management
=======
# MERN Task API

This is a simple authentication and category management API built with Node.js, Express.js, and MongoDB. The project also includes Docker support for easy deployment.
 Sample API responses.


Sample API Responses
🔹 Authentication APIs
Register a User
Endpoint: POST /api/auth/register
Request Body:
{
  "user_name": "Test User",
  "email": "test@example.com",
  "password": "Test@123"
}
Response:
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1..."
}

Endpoint: POST /api/auth/login
Request Body:
{
  "email": "test@example.com",
  "password": "Testing@123"
}
Response:
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1..."
}
🔹 Category APIs
Create a Category
Endpoint: POST /api/category
{
    "name": "Burgers",
    "parent_category": "Fast Food",
    "status": "active"
  }
Response:

{
  "message": "Category created successfully",
  "category":{
    "message": "Category created successfully",
    "category": {
        "name": "Burgers2",
        "parent_category": "67a73dc09f15b381aff2c2ae",
        "status": "active",
        "_id": "67abbbbb108e5fb2607e1daf"
   
    }
}:
  }
}

get api/category

{
    "message": "Categories fetched successfully",
    "categoryList": [
        {
            "id": "67a73d9c9f15b381aff2c2a9",
            "name": "Food",
            "status": "active",
            "subCategories": [
                {
                    "id": "67a73dc09f15b381aff2c2ae",
                    "name": "Fast Food",
                    "status": "active",
                    "subCategories": [
                        {
                            "id": "67a73ddd9f15b381aff2c2b8",
                            "name": "Pizza",
                            "status": "inactive",
                            "subCategories": []
                        },
                        {
                            "id": "67a73de59f15b381aff2c2bd",
                            "name": "Fried Chicken",
                            "status": "inactive",
                            "subCategories": []
                        },
                        {
                            "id": "67a73df09f15b381aff2c2c2",
                            "name": "Hot Dogs",
                            "status": "inactive",
                            "subCategories": []
                        },
                        {
                            "id": "67ab87a00295f316f534f3d1",
                            "name": "Burgers",
                            "status": "active",
                            "subCategories": []
                        },
                        {
                            "id": "67abbbbb108e5fb2607e1daf",
                            "name": "Burgers2",
                            "status": "active",
                            "subCategories": []
                        }
                    ]
                },
                {
                    "id": "67a73dfb9f15b381aff2c2c7",
                    "name": "Beverages",
                    "status": "active",
                    "subCategories": [
                        {
                            "id": "67a73e089f15b381aff2c2cc",
                            "name": "Soft Drinks",
                            "status": "active",
                            "subCategories": []
                        },
                        {
                            "id": "67a73e119f15b381aff2c2d1",
                            "name": "Juices",
                            "status": "active",
                            "subCategories": []
                        },
                        {
                            "id": "67a792e523aae1c5a6255c89",
                            "name": "Coffee",
                            "status": "inactive",
                            "subCategories": [
                                {
                                    "id": "67a793f823aae1c5a6255cad",
                                    "name": "Cold Coffee",
                                    "status": "inactive",
                                    "subCategories": []
                                },
                                {
                                    "id": "67a7940023aae1c5a6255cb2",
                                    "name": "Hot Coffee",
                                    "status": "inactive",
                                    "subCategories": []
                                }
                            ]
                        },
                        {
                            "id": "67a792ee23aae1c5a6255c8e",
                            "name": "Tea",
                            "status": "active",
                            "subCategories": []
                        }
                    ]
                }
            ]
        }
    ]
}

 Update a Category
Endpoint: PUT /api/category/:id
Request Body:

{
  "name": "Updated Category"
}
Response:

{
  "message": "Category updated successfully",
  "category": {
    "id": "64a1b7...",
    "name": "Updated Category"
  }
}
