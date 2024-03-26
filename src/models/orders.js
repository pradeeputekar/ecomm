import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema(
  {
    allProducts: { type: Array },
    totalItem: { type: String, required: true },
    totalMRP: { type: String, required: true },
    totalDiscount: { type: String },
    finalPayment: { type: String, required: true },
    status: { type: String, required: true },
    userEmail: { type: String, required: true },
    name: { type: String, required: true },
    intent_id: { type: String, unique: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    postal_code: { type: String, required: true },
    state: { type: String, required: true },
  },
  {
    timestamps: {
      currentTime: () => Date.now() + 19800000, // IST timezone offset in milliseconds (19800000 ms = 5 hours 30 minutes)
    },
  }
);

const Order = models.Order || mongoose.model("Order", orderSchema);
export default Order;
