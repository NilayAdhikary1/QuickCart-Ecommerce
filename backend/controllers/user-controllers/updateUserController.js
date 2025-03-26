import asyncHandler from "../../middleware/asyncHandler.js";
import { User } from "../../models/UserModel.js";

export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const userObj = await User.findById(req.user._id);
  if (!userObj) {
    res.status(403);
    throw new Error("Unauthorized!! You can't update profile!!");
  }

  userObj.name = req.body.name || userObj.name;
  userObj.email = req.body.email || userObj.email;

  // since password is hashed, so check before if there is new password in req.body
  if (req.body.password) {
    userObj.password = req.body.password;
  }

  const updatedUser = await userObj.save();
  res.status(200).json({
    message: "User Profile Updated Successfully!!",
    modifiedUser: {
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    },
  });
});
