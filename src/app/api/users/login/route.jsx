import connectDB from "@/config/dbConfig";
import User from "@/models/user-model";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "@/config";

connectDB();

export const POST = async (request) => {
  try {
    const { email, password } = await request.json();
    // validate request
    if (!email || !password) {
      return NextResponse.json(
        { message: "Please provides all required fields !" },
        { status: 422 }
      );
    }
    // check email exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Email does not found !" },
        { status: 404 }
      );
    }
    // check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Password is not correct" },
        { status: 400 }
      );
    }
    // generate token
    const accessToken = jwt.sign(
      {
        _id: user._id,
        isAdmin: user.isAdmin,
      },
      TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    // send response with cookie
    const response = NextResponse.json(
      { message: "User is login successfully" },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error !" },
      { status: 500 }
    );
  }
};
