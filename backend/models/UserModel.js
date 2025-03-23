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

userSchema.methods.passwordIsMatched = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model("User", userSchema);
