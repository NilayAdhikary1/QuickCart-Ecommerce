// In this file I need to check the existance and validity of the jwt with every request sent from the user before we allow the request to continue...!!
// If no token is attactched then we just simply reject the request as the user is not authenticated...

import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";
import asyncHandler from "./asyncHandler.js";

// APPROACH-1 (FOR JWT STORED IN BROWSER):===========================================
// export const veriryToken = (req, res, next) => {
//   const authHeader = req.get("Authorization");
//   if (!authHeader) {
//     const err = new Error("Not authenticated!!");
//     err.statusCode = 401;
//     throw err;
//   }
//   const token = authHeader.split(" ")[1]; // I attach the token to the 'Authrization' header with bearer. So to the token from from request we use split.
//   let decodedToken;
//   try {
//     decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedToken) {
//     // means it didn't failded technically but it couldn't somehow verify the token...
//     const err = new Error("Not authenticated!!");
//     err.statusCode = 401;
//     throw err;
//   }

//   // verification successful.........
//   req.userId = decodedToken.userId; // So now I know the userId. It can be used later for autorization while deleting or updating a product.
//   req.isAdmin = decodedToken.isAdmin;
//   next();
// };

// APPROACH-2 (FOR JWT STORED IN HTTP-ONLY COOKIE):=====================================
export const isAuthUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.jwt;
  if (!token) {
    res.status(401);
    throw new Error("No token!! User is not authorised...!!");
  }

  // ✅ this try-catch handles JWT errors explicitly...
  let decodedToken;
  try {
    // if there is a token, verify it...
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (error) {
    res.status(403);
    throw new Error("Invalid token. Access forbidden!");
  }

  // ✅ Async errors (handled by asyncHandler middleware)
  // Since the token contains userId, so get that user from database based on the userId...
  // Here we exclue the field password field from the userDoc due to sensitive information..
  // We should not include sensitive info in the cookie...
  const userDoc = await User.findById(decodedToken.userId).select("-password");

  // if (!userDoc) is necessary to ensure the token belongs to an active user. There might be a case where a valid JWT belong to a user who was deleted from the database. If you don’t check this, your app might try to process a non-existent user, leading to unexpected errors.

  if (!userDoc) {
    res.status(404);
    throw new Error("User Not Found...!!");
  }

  req.user = userDoc; // attach the user object to the request...
  next(); // Proceed to the next middleware or route handler
});
