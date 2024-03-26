import { connectMongoDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Order from "@/models/orders";
import Product from "@/models/products";

connectMongoDB();

export const PUT = async (req, params) => {
  const {
    params: { intentId, orderId },
  } = params;

  try {
    await Order.updateOne(
      { _id: orderId },
      { $set: { intent_id: intentId, status: "Paid" } }
    );

    const order = await Order.findById(orderId);

    // Extract the products array from the order document
    const products = order.allProducts;

    // Update product quantity in the product collection

    for (const product of products) {
      await Product.updateOne(
        { _id: product._id },
        { $inc: { stock_qty: -parseInt(product.quantity) } } // Decrease the quantity based on the quantity in the order
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.log("order update error".err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
