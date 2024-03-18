import { getAuthSession } from "@/utils/auth";
import { NextResponse } from "next/server";
import Order from "@/models/orders";
import { connectMongoDB } from "@/utils/db";

// FETCH ALL ORDERS

connectMongoDB();

export const GET = async (req) => {
  const session = await getAuthSession();

  if (session) {
    try {
      if (session.user.admin) {
        const orders = await Order.find();
        return new NextResponse(JSON.stringify(orders), { status: 200 });
      }
      const orders = await Order.find({
        userEmail: session.user.email,
      });

      return new NextResponse(JSON.stringify(orders), { status: 200 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};

// CREATE ORDER
export const POST = async (req) => {
  const session = await getAuthSession();

  if (session) {
    try {
      const {
        allProducts,
        finalPayment,
        name,
        status,
        totalDiscount,
        totalItem,
        totalMRP,
        userEmail,
      } = await req.json();
      const order = await Order.create({
        allProducts,
        finalPayment,
        name,
        status,
        totalDiscount,
        totalItem,
        totalMRP,
        userEmail,
      });
      return new NextResponse(JSON.stringify(order), { status: 201 });
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong! ahe" }),
        { status: 500 }
      );
    }
  } else {
    return new NextResponse(
      JSON.stringify({ message: "You are not authenticated!" }),
      { status: 401 }
    );
  }
};
