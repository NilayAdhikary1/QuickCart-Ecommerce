import asyncHandler from "../../middleware/asyncHandler.js";
import { User } from "../../models/UserModel.js";
import { Order } from "../../models/OrderModel.js";

// @desc Get User Profiles (by admin)
// @route GET  /admin/users
// @access Private/Admin Access Only
export const getUserProfiles = asyncHandler(async(req, res, next) => {
    res.send("Details of all the users are being displayed(Admin side)...!!");
});


// @desc Get a Particular User (by admin)
// @route GET  /admin/users/:userId
// @access Private/Admin Access Only
export const getUserById = asyncHandler(async(req, res, next) => {
    res.send("Here is the details of the user(Admin side)...!!");
})


// @desc Update user profile (by admin)
// @route PUT  /admin/users/:userId
// @access Private
export const updateUser = asyncHandler(async(req, res, next) => {
    res.send("User Profile Updated(Admin side)...!!");
})


// @desc Delete an User (by admin)
// @route DELETE  /admin/users/:userId
// @access Private/Admin Access Only
export const deleteUser = asyncHandler(async(req, res, next) => {
    res.send("User Deleted Successfully(Admin side)...!!");
});



// @desc  Fetches all the orders...
// @route  GET /admin/users/orders
// @access  Admin access
export const getAllOders = asyncHandler(async(req, res, next) => {
    res.send("Here  is the list All the orders viewed from admin side...");
});


// @desc  Fetches an order by its I'd
// @route  GET /admin/orders/:orderId
// @access Private(Only Admin)

export const getOrderById = asyncHandler(async(req, res, next) => {
    res.send("Admin saw the order by it's id!!");
});



// @desc  Marks an order as delivered...
// @route  PUT /admin/orders/:orderId/deliver
// @access  Admin only

export const updateOrderToDelivered  = asyncHandler(async(req, res, next) => {
    res.send("Order delivered successfully...");
});