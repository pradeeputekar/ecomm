import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { NextResponse } from "next/server";

connectMongoDB();

export async function GET(req) {
  const data = await Product.find({});

  return NextResponse.json(data, {
    status: 200,
  });
}
