import asyncHandler from "../../middleware/asyncHandler.js";
import { User } from "../../models/UserModel.js";

// @desc Get User Profiles (by admin)
// @route GET  /users
// @access Private/Admin Access Only
export const getUserProfiles = asyncHandler(async(req, res, next) => {
    res.send("Details of all the users are being displayed(Admin side)...!!");
})


// @desc Get a Particular User (by admin)
// @route GET  /users/:userId
// @access Private/Admin Access Only
export const getUserById = asyncHandler(async(req, res, next) => {
    res.send("Here is the details of the user(Admin side)...!!");
})


// @desc Update user profile (by admin)
// @route PUT /users/:userId
// @access Private
export const updateUser = asyncHandler(async(req, res, next) => {
    res.send("User Profile Updated(Admin side)...!!");
})


// @desc Delete an User (by admin)
// @route DELETE  /users/:userId
// @access Private/Admin Access Only
export const deleteUser = asyncHandler(async(req, res, next) => {
    res.send("User Deleted Successfully(Admin side)...!!");
})