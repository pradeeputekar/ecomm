import { connectMongoDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Order from "@/models/orders";

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
