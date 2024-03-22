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
    console.log("products", products);

    // Update product quantity in the product collection
    let processedProductIds = [];
    for (const product of products) {
      // Check if the current product has already been processed
      if (processedProductIds.includes(product._id)) {
        console.log(product._id, "already processed, skipping update.");
        continue; // Skip to the next iteration
      }
      console.log("Product ID:", product._id);
      console.log("Product Quantity:", product.quantity);
      await Product.updateOne(
        { _id: product._id }, // Assuming productId is the field containing product ID
        { $inc: { stock_qty: -parseInt(product.quantity) } } // Decrease the quantity based on the quantity in the order
      );

      // Add the processed product ID to the list
      processedProductIds.push(product._id);
    }

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
