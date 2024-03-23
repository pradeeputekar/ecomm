import { NextResponse } from "next/server";
import Product from "@/models/products";
import { connectMongoDB } from "@/utils/db";
import { deleteImage } from "@/utils/upload-image";
import { uploadToCloudinary } from "@/utils/upload-image";

connectMongoDB();

export async function PUT(req, ctx) {
  const productId = ctx.params.id;
  const data = await req.formData();
  const image = await data.get("image");
  const public_id = await data.get("public_id");

  try {
    await deleteImage(public_id);
    const result = await uploadToCloudinary(image);
    const updatedImageData = await Product.findByIdAndUpdate(productId, {
      public_id: result?.public_id,
      image_url: result?.secure_url,
    });

    return NextResponse.json(
      { updatedImageData, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Image update error", error);
    return NextResponse.json(
      { err: "Failed to update image" },
      { status: 500 }
    );
  }
}
