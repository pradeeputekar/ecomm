import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import { deleteImage } from "@/utils/upload-image";
import { NextResponse } from "next/server";

connectMongoDB();
export async function DELETE(req, ctx) {
  const imagePublicId = ctx.params.id;
  const resultDelete = await deleteImage(imagePublicId);
  await Product.findOneAndDelete({
    public_id: imagePublicId,
  });

  return NextResponse.json({ msg: resultDelete }, { status: 200 });
}

export async function PUT(req, ctx) {
  const productId = ctx.params.id;
  const data = await req.formData();
  const title = await data.get("title");
  const description = await data.get("description");
  const price = await data.get("price");
  const stock_qty = await data.get("stock_qty");

  try {
    const updatedData = await Product.findByIdAndUpdate(productId, {
      title,
      description,
      price,
      stock_qty,
    });
    return NextResponse.json({ updatedData, success: true }, { status: 200 });
  } catch (error) {
    console.log("product update error", error);
    return NextResponse.json(
      { err: "Failed to update product" },
      { status: 500 }
    );
  }
}
