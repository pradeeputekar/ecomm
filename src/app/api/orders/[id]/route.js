import { connectMongoDB } from "@/utils/db";
import Order from "@/models/orders";
import { NextResponse } from "next/server";

connectMongoDB();
export async function DELETE(req, ctx) {
  try {
    const orderId = ctx.params.id;
    await Order.findOneAndDelete({
      _id: orderId,
    });

    return NextResponse.json(
      { msg: "order deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "something went wrong" }, { status: 500 });
  }
}

export async function PUT(req, ctx) {
  const orderId = ctx.params.id;
  const data = await req.formData();
  const city = await data.get("city");
  const country = await data.get("country");
  const line1 = await data.get("line1");
  const line2 = await data.get("line2");
  const postal_code = await data.get("postal_code");
  const state = await data.get("state");

  try {
    const updatedData = await Order.findByIdAndUpdate(orderId, {
      city,
      country,
      line1,
      line2,
      postal_code,
      state,
    });
    return NextResponse.json({ updatedData, success: true }, { status: 200 });
  } catch (error) {
    console.log("order update error", error);
    return NextResponse.json(
      { err: "Failed to update order" },
      { status: 500 }
    );
  }
}
