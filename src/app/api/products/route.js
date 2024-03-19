import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET(req) {
  try {
    const data = await Product.find({});

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store",
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
