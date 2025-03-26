import asyncHandler from "../../middleware/asyncHandler.js";
import { User } from "../../models/UserModel.js";
import { generateToken } from "../../utils/tokenGeneration.js";

// @desc Register a new user and generate a jwt token
// @route POST /account/signup
// @access Public

export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // Now first check if this email already registered to the db or not!!
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error(
      "This email i'd already exists. Try with a new email i'd!!"
    );
  }

  //   You can encrypt the password here also, But I did it in the userModel to make it more easier...
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    password
  });
  const savedUser = await newUser.save();

  generateToken(res, savedUser._id);

  res.status(201).json({
    message: "User registered Successfully!!",
    user: savedUser,
  });
});
