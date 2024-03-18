import { connectMongoDB } from "@/utils/db";
import { NextResponse } from "next/server";
import Order from "@/models/orders";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
connectMongoDB();

export async function POST(req, params) {
  const {
    params: { orderId },
  } = params;

  const order = await Order.findOne({
    _id: orderId,
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.finalPayment * 100,
      currency: "inr",
      automatic_payment_methods: {
        enabled: true,
      },
      description: "Testing Stripe Integration",
    });

    await Order.findByIdAndUpdate(orderId, { intent_id: paymentIntent.id });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 }
    );
  }
  return new NextResponse(
    JSON.stringify({ message: "Order not found! apiintemnd" }),
    {
      status: 404,
    }
  );
}
