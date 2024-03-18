import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { uploadImage } from "@/utils/upload-image";
import { NextResponse } from "next/server";

connectMongoDB();
export async function POST(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const price = formData.get("price");
  // const image = formData.get("image");
  // const data = await uploadImage(image, "ShopCart");
  await Product.create({
    title: title,
    description: description,
    price: price,
    // image_url: data?.secure_url,
    // public_id: data?.public_id,
  });

  return NextResponse.json({ msg: data }, { status: 200 });
}
