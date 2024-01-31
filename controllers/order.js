const Order = require("../models/order");
const OrderItem = require("../models/orderItem");
const Payment = require("../models/payment");
const {
  orderSchema,
  updateOrderSchema,
} = require("../helpers/init_validation");
const z = require("zod");

exports.getOrder = async (req, res, next) => {
  try {
    const orders = await Order.find();
    if (!orders) return res.status(404).json({ message: "Order not found" });

    res.status(200).json({ message: "Order got successfully", orders });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const validatedOrder = req.body;

    const orderItemsArray = [];
    for (let item of validatedOrder.orderItems) {
      const orderItem = new OrderItem(item);
      await orderItem.save();
      orderItemsArray.push(orderItem._id);
    }

    const paymentObject = new Payment(validatedOrder.payment);
    await paymentObject.save();

    const order = new Order({
      orderItems: orderItemsArray,
      payment: paymentObject._id,
      users: validatedOrder.users,
    });

    await order.save();

    const populatedOrder = await Order.findById(order._id)
      .populate("orderItems")
      .populate("payment")
      .populate("users");

    res
      .status(201)
      .json({ message: "Order created successfully", populatedOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid input data", error: error.errors });
    }

    next(error);
  }
};
// user can update location, phone number,
exports.updateOrder = async (req, res, next) => {
  try {
    const validatedOrder = updateOrderSchema.parse(req.body);
    // must have userId to update
    const { orderId } = req.params;

    // I'm just searching using the orderId to allow updatation by multiusers
    const order = await Order.findByIdAndUpdate(
      orderId,
      { $addToSet: { users: validatedOrder.user } },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    for (let item of validatedOrder.orderItems) {
      const orderItem = await OrderItem.findById(item?._id);

      if (!orderItem) {
        return res.status(404).json({ message: "Order item not found" });
      }

      // update the fields that want; eg: quantity
      orderItem.set({
        quantity: item?.quantity ? item?.quantity : orderItem.quantity,
      });
      await orderItem.save();
    }

    // also can add like if chnanged then only
    order.set({
      phone: validatedOrder?.phone ? validatedOrder?.phone : order?.phone,
      shippingAddress: validatedOrder?.shippingAddress
        ? validatedOrder?.shippingAddress
        : order?.shippingAddress,
      // and so on....
    });

    const populatedOrder = await Order.findById(orderId)
      .populate("orderItems")
      .populate("payment")
      .populate("users");

    res
      .status(200)
      .json({ message: "Order updated successfully", populatedOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid input data", error: error.errors });
    }

    next(error);
  }
};

// payment on order
exports.paymentOnOrder = async (req, res, next) => {
  try {
    const paymentSchema = z.object({
      amount: z.number().positive(),
      method: z.enum(["Cash", "Card", "Online"]),
      status: z.enum(["Pending", "Completed", "Failed"]),
    });
    const validatedPayment = paymentSchema.parse(req.body);

    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.payment?.status === "Completed") {
      return res.status(409).json({ message: "Order already has a payment" });
    }

    const payment = new Payment(validatedPayment);
    await payment.save();

    order.payment = payment._id;
    await order.save();

    const populatedOrder = await Order.findById(orderId)
      .populate("orderItems")
      .populate("payment")
      .populate("users");

    res
      .status(200)
      .json({ message: "Order payment done successfully", populatedOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res
        .status(400)
        .json({ message: "Invalid input data", error: error.errors });
    }
    next(error);
  }
};
