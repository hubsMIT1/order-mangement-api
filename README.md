# order-mangement-api
a backend API for an Order Management System. The API supports basic CRUD operations for employee records. 

# Instruction
- clone 
```
cd order-management-api
```
- update the mongodb url in .env file
```
npm i
npm run dev
```

- For test 
```
npm test 
```

Dummy data (at least add one user first | userId is not optional)
```

POST : http://localhost:3000/user/
user:
  {
    "name": "Shiva yy",
    "email": "shivayy@example.com",
    "password": "12345678"
}

POST : http://localhost:3000/order/
order: {
    "orderItems": [
      {
        "product": "Book",
        "quantity": 2,
        "price": 10
      },
      {
        "product": "Pen",
        "quantity": 5,
        "price": 1
      }
    ],
    "payment": {
      "amount": 25,
      "method": "Cash",
      "status": "Pending"
    },
    "users": ["60f9a8b7a0a7c62a0c4c7e5b"], 
    <!-- udpate the user id  -->
  }

PUT: 
  updatedOrder:{
    {
    "orderItems": [
        {
            "quantity": 2,
          	"_id":"65b8b4528334a2ebaaed92e9" 
            <!-- update the items id -->
        },
        {
            "quantity": 8,
          	"_id":"65b8b4528334a2ebaaed92eb"
            <!-- update the items id -->

        }
    ],

    "user": "65b8ede856a14b0d4865f029",
    <!-- update the user id -->
  	"phone": "9966886631",
  	"shippingAddress":"nitt"
}
  }


POST : http://localhost:3000/order/65b8b4528334a2ebaaed92ef/payment

  payment:{
    {
        "amount": 30,
        "method": "Cash",
        "status": "Pending"
    }
  }

*/
```
# Explanation & file Structure

- **index.js**: The main file that creates and configures the Express app.

### Models
- **models/**: Directory containing Mongoose models.
  - `order.js`: Model for orders.
  - `orderItem.js`: Model for order items.
  - `payment.js`: Model for payments.
  - `user.js`: Model for users.

### Controllers
- **controllers/**: Directory for Express logic and controllers.
  - `orderController.js`: Controller for order-related endpoints.

### Helpers
- **helpers/**: Directory for helper functions and modules.
  - `initValidation.js`: Module defining and exporting Zod schemas.

### Unit Tests
- **unit/**: Directory for test files.
  - `order.test.js`: Test file for the order controller using Jest and Supertest.
