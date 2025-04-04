import asyncHandler from '../../middleware/asyncHandler.js';
import { Order } from '../../models/OrderModel.js';


// @desc  Marks an order as paid...
// @route  PUT /account/orders/:orderId/pay
// @access  Authenticated users only

export const updateOrderToPaid = asyncHandler(async(req, res, next) => {
    res.send("Paid successfully...");
});