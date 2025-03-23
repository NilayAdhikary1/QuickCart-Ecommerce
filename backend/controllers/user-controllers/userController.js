import asyncHandler from "../../middleware/asyncHandler.js";
import { User } from "../../models/UserModel.js";
import jwt from "jsonwebtoken";

// @desc Auth user and get the token
// @route POST /account/login
// @access Public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email: email });
  if (!userDoc) {
    // email is not registered in Database...
    res.status(401);
    throw new Error("Please Register Yourself!!");
  }

  //  this passwordIsMatched method is defined in userSchema. This makes it an instance method available on all documents like userDoc created from the User model.
  if (!(await userDoc.passwordIsMatched(password))) {
    res.status(401);
    throw new Error("Enter your valid password!!");
  }

  // WE SHOULD NOT STORE 'password' TO THE TOKEN AS IT WILL BE SENT TO THE USER, SO IT IS IDEAL NOT TO SEND PASSWORD ALONG...
  const token = jwt.sign(
    {
      userId: userDoc._id.toString(),
      email: userDoc.email,
      isAdmin: userDoc.isAdmin,
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "30d" }
  );

  // Now here I will store the token in a http-only cookie on the server(we don't send it to frontend to store it in the local browser storage...)
  res
    .cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "Strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      _id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
      isAdmin: userDoc.isAdmin,
      // token : token (I dont send it via response to the browser storage)
    });
});

// @desc Register a new user
// @route POST /account/signup
// @access Public
export const registerUser = asyncHandler(async (req, res, next) => {
  res.send("User registered successfully!!");
});

// @desc Log out the user and clears a cookie
// @route POST /account/logout
// @access Private
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.send("User logged out successfully!!");
});

// @desc Details of the user profile
// @route GET /account/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
  res.send("User Profile details...!!");
});

// (here no need to pass an id to update user profile as the user is signed in using JWT so it can be edited by himself only...)
// @desc Update user profile
// @route PUT /account/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  res.send("User Profile Updated...!!");
});
