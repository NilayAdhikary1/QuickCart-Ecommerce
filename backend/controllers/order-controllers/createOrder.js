import asyncHandler from "../../middleware/asyncHandler.js";
import { Order } from "../../models/OrderModel.js";

// @desc  Create new order
// @route  POST /account/orders
// @access Private(Authenticated user only)

export const createOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems?.length === 0) {
    res.status(400);
    throw new Error("Missing order Items!!");
  } else {
    const itemsArr = orderItems.map((item) => ({
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
    }));
    const order = new Order({
      user: req.user._id,
      orderItems: itemsArr,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});
