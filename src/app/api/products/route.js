import { connectMongoDB } from "@/utils/db";
import Product from "@/models/products";
import cloudinary from "@/utils/cloudinary";
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
  const image = await data.get("image");
  const fileBuffer = await image.arrayBuffer();

  var mime = image.type;
  var encoding = "base64";
  var base64Data = Buffer.from(fileBuffer).toString("base64");
  var fileUri = "data:" + mime + ";" + encoding + "," + base64Data;

  try {
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        var result = cloudinary.uploader
          .upload(fileUri, {
            invalidate: true,
          })
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    };
    const result = await uploadToCloudinary();
    await Product.create({
      title: title,
      description: description,
      price: price,
      image_url: result?.secure_url,
      public_id: result?.public_id,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
}
