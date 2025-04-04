import asyncHandler from '../../middleware/asyncHandler.js';
import { Order } from '../../models/OrderModel.js';


// @desc  This allows to cancel an order before shipping...
// @route  DELETE /account/orders/:orderId
// @access  Private(Only for authenticated users)

export const cancelOrder = asyncHandler(async(req, res, next) => {
    res.send("Your Order is cancelled");
});