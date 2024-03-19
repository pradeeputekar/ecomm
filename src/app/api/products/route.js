import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET() {
  try {
    const data = await Product.find({});
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
