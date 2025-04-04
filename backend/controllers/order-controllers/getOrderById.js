import asyncHandler from "../../middleware/asyncHandler.js";
import { Order } from "../../models/OrderModel.js";

// @desc  Fetches an order by its I'd
// @route  GET /account/orders/:orderId
// @access Private(Authenticated User)

export const getOrderById = asyncHandler(async (req, res, next) => {
  // It is kind of join operation in SQL. we want all the details of the particular id from order collection as well as some properties from 'user' collection too...
  const orderDetails = await Order.findById(req.params.orderId).populate(
    "user",
    "name email"
  );
  if(!orderDetails){
    res.status(404);
    throw new Error("Order not found!!");
  }
  res.status(200).json(orderDetails);
});
