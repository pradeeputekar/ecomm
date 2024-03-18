import { connectMongoDB } from "@/utils/db";
import User from "@/models/users";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password, admin = false } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email and password are required fields" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    await User.create({ name, email, password: hashedPassword, admin });

    return NextResponse.json(
      { message: "User Registered", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
