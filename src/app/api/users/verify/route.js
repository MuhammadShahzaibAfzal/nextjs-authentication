import connectDB from "@/config/dbConfig";
import User from "@/models/user-model";
import { NextResponse } from "next/server";

connectDB();

export const POST = async (request) => {
  const { verifyToken } = await request.json();
  try {
    // check token exist or not
    const user = await User.findOne({ verifyToken });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid verification token !" },
        { status: 400 }
      );
    }
    // check token is expired
    const isExpired = Date.now() > user.verifyTokenExpiry;

    if (isExpired) {
      return NextResponse.json(
        { message: "Verification token expired !" },
        { status: 400 }
      );
    }
    // Update user to verify
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    user.isVerified = true;
    await user.save();

    return NextResponse.json(
      { message: "User verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error !" },
      { status: 500 }
    );
  }
};
