import mongoose, { Schema, models } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock_qty: { type: Number, required: true },
    image_url: { type: String, required: true },
    public_id: { type: String, required: true },
  },
  {
    timestamps: {
      currentTime: () => Date.now() + 19800000, // IST timezone offset in milliseconds (19800000 ms = 5 hours 30 minutes)
    },
  }
);

const Product = models.Product || mongoose.model("Product", productSchema);
export default Product;
