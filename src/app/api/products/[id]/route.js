import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { deleteImage } from "@/utils/upload-image";
import { NextResponse } from "next/server";

connectMongoDB();
export async function DELETE(req, ctx) {
  const imagePublicId = "ShopCart/" + ctx.params.id;
  const resultDelete = await deleteImage(imagePublicId);
  await Product.findOneAndDelete({
    public_id: imagePublicId,
  });

  return NextResponse.json({ msg: resultDelete }, { status: 200 });
}
