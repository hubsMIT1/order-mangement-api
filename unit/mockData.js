// Sample validated order data
const mockValidatedOrder = {
    orderItems: [
      {
        product: 'Book',
        quantity: 2,
        price: 10,
      },
      {
        product: 'Pen',
        quantity: 5,
        price: 1,
      },
    ],
    payment: {
      amount: 25,
      method: 'Cash',
      status: 'Pending',
    },
    users: ['60f9a8b7a0a7c62a0c4c7e5b'],
  };

  
  // Sample validated updated order data

  const mockOderId = '65b8b4528334a2ebaaed92ef';

  const mockValidatedUpdatedOrder = {
    
      "orderItems": [
          {
              "quantity": 2,
              "_id":"65b8b4528334a2ebaaed92e9"
          },
          {
              "quantity": 8,
              "_id":"65b8b4528334a2ebaaed92eb"
          }
      ],
  
      "user": "65b8ede856a14b0d4865f029",
      "phone": "9966886631",
      "shippingAddress":"nitt"
  
  };
  
  // Sample validated payment data
  const mockValidatedPayment = {
    amount: 30,
    method: 'Cash',
    status: 'Pending',
  };

  const mockUserData = {
    "name": "Shiva yy",
    "email": "shvayaayy@example.com",
    "password": "12345678"
}
  
  module.exports = {
    mockValidatedOrder,
    mockValidatedUpdatedOrder,
    mockValidatedPayment,
    mockOderId,
    mockUserData
  };
  