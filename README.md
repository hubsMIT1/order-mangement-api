# order-mangement-api
a backend API for an Order Management System. The API supports basic CRUD operations for employee records. 




```
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
  }

PUT: 
  updatedOrder:{
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
    "users": ["60f9a8b7a0a7c62a0c4c7e5b"]
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


