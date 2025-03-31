import mongoose from "mongoose";
const { Schema } = mongoose;

// This schema refers in a single order which items and how many of them have been ordered by user...
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        //It stores the product id only
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: String,
        image: String,
        price: Number,
        quantity: Number,
      },
    ],
    shippingAddress: {
      fullName: { type: String, required: true },
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: Number, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "Credit Card", "Debit Card", "UPI", "Net Banking"],
    },
    paymentResult: {
      id: String, // Transaction ID from payment gateway
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: Date,
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

export const Order = mongoose.model("Order", orderSchema);
