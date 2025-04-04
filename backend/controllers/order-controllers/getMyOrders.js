import asyncHandler from '../../middleware/asyncHandler.js';
import { Order } from '../../models/OrderModel.js';


// @desc  Fetches all the orders by currently logged-in user...
// @route  GET /account/orders/myorders
// @access  Authenticated user only

export const getMyOrders = asyncHandler(async(req, res, next) => {
    const orders = await Order.find({ user : req.user._id});
    res.status(200).json(orders);
});