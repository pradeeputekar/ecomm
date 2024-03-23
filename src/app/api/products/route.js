import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { uploadToCloudinary } from "@/utils/upload-image";
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

export async function POST(req) {
  const data = await req.formData();
  const title = await data.get("title");
  const description = await data.get("description");
  const price = await data.get("price");
  const stock_qty = await data.get("stock_qty");
  const image = await data.get("image");

  try {
    const result = await uploadToCloudinary(image);
    const datashow = await Product.create({
      title: title,
      description: description,
      price: price,
      stock_qty: stock_qty,
      image_url: result?.secure_url,
      public_id: result?.public_id,
    });

    return NextResponse.json({ datashow, success: true }, { status: 200 });
  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
}
