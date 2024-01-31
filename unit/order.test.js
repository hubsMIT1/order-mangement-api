const mongoose = require("mongoose");
const request = require("supertest");
const { app, server } = require("../index");
const {
  mockValidatedOrder,
  mockOderId,
  mockValidatedUpdatedOrder,
  mockValidatedPayment,
  mockUserData,
} = require("./mockData");

describe("GET /order", () => {
  it("should return all order", async () => {
    return request(app)
      .get("/order")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });
});

describe("POST /user", () => {
  test("should create an user", async () => {
    return request(app)
      .post("/user")
      .send(mockUserData)
      .expect((res) => {
        expect([201, 409]).toContain(res.status);
      });
  });
});

describe("POST /order", () => {
  test("should create an order", async () => {
    return request(app)
      .post("/order")
      .send(mockValidatedOrder)
      .expect(201)
      .then(({ body }) => {
        // console.log(body);
        expect(body.message).toBe("Order created successfully");
      });
  });
});

describe("PUT /order/:id", () => {
  test("should update an order", async () => {
    return request(app)
      .put(`/order/${mockOderId}`)
      .send(mockValidatedUpdatedOrder)
      .expect(200);
  });
});

describe("POST /order/:orderId/payment", () => {
  test("should payment on order", async () => {
    return request(app)
      .post(`/order/${mockOderId}/payment`)
      .send(mockValidatedPayment)
      .expect((res) => {
        expect([200, 409]).toContain(res.status);
      });
  });
});

afterAll(async () => {
  server.close();
  await mongoose.connection.close();
});
