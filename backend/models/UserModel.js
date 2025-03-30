import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false, // Users are not admins by default
    },
    addresses: [
      {
        fullName: String,
        phone: String,
        street: String,
        city: String,
        state: String,
        country: String,
        postalCode: String,
        addressesType : String, //Home, Work, Other
        isDefault: { type: Boolean, default: false }, // Mark a default address
      },
    ],
    cart: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, default: 1 },
      },
    ],
    orders: [
      {
        orderId: { type: Schema.Types.ObjectId, ref: "Order" },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Middleware: Hash password before saving. This is why we use pre...
userSchema.pre("save", async function (next) {
  try {

    // Only hash the password if it is modified or new. This helps in avoiding same password hashing unnecessaryly...
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
});

// Method: Check if passwords match...
userSchema.methods.passwordIsMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
