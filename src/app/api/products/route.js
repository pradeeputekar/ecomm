import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET() {
  try {
    const data = await Product.find({});
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Cache-Control": "max-age=10",
        "CDN-Cache-Control": "max-age=10",
        "Vercel-CDN-Cache-Control": "max-age=10",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
