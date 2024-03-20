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
