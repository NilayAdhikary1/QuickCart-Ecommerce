import asyncHandler from "../../middleware/asyncHandler.js";
import { User } from "../../models/UserModel.js";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/tokenGeneration.js";

// @desc Log in user and get the token
// @route POST /account/login
// @access Public
export const loginUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { email, password } = req.body;

  const userDoc = await User.findOne({ email });
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

  //   This is how we generate jwt tokens and set that to the res object...
  generateToken(res, userDoc._id.toString());

  res.status(200).json({
    _id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
    isAdmin: userDoc.isAdmin,
    // token : token (I dont send it via response to the browser storage)
  });
});
