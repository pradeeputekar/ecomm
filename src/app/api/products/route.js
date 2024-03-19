import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET(req) {
  try {
    const data = await Product.find({});

    const response = new NextResponse(JSON.stringify(data), {
      message: "fetch product sucessfully",
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
